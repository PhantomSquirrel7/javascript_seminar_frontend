import { Component, OnInit } from '@angular/core';
import { Body9, User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/swagger-api/classes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from '@app/services/swagger-api/projects.service';
import { MeetingsService } from '@app/services/swagger-api/meetings.service';


@Component({
  selector: 'app-plan-meeting-content',
  templateUrl: './plan-meeting-content.component.html',
  styleUrls: ['./plan-meeting-content.component.less']
})
export class PlanMeetingContentComponent implements OnInit {
  projectList = [];

  clsSelecForm: FormGroup;
  projectSelectForm: FormGroup;
  planningSectionForm: FormGroup;

  timeValue = '';
  user: User;
  error = '';
  isClassSelected = false;
  selectedClass: any; // Type Class
  selectedTypeOfClass = ''
  selectedDuration: number;
  durations = [30, 45, 60, 90, 120];
  date: Date;
  typeOfClasses = ['Quiz', 'Ice-Breaker Game', 'Others',]
  loading = false;
  selectedArrangement = '';
  selectedProject: any; // Type Project
  isProjectSelected = false;

  user_classes = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ClassesService,
    private projectService: ProjectsService,
    private _snackBar: MatSnackBar,
    private meetingService: MeetingsService,
  ) { }

  ngOnInit() {
    this.selectedArrangement = 'tandem';
    this.clsSelecForm = this.fb.group({
      selectedClass: [null]
    });
    this.projectSelectForm = this.fb.group({
      selectedProject: [null]
    });
    this.planningSectionForm = this.fb.group({
      selectedDuration: [null],
      selectedTime: [null]
    });
    this.classService.classesGet().subscribe({
      next: (response) => {
        this.loading = false;
        this.user_classes = response;
        console.log(this.user_classes[0]);
      },
      error: (error) => {
        this.error = error;
        this._snackBar.open(this.error, 'Close', {
          duration: 3000
        });
        this.loading = false;
      },
    });
  }

  classSelected() {
    this.projectList = []
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isClassSelected = true;
    this.isProjectSelected = false;
    console.log('teacher:' + this.selectedClass.id)

    this.projectService.classesClassIdProjectsGet(this.selectedClass.id).subscribe({
      next: (response) => {
        this.projectList = response;
        
        for (let entry of this.projectList) {
          entry['classname'] = entry['classes'][1]['name']

          if(entry['classes'][1]['teacher']['schoolName'] ) {
            entry['schoolName'] = entry['classes'][1]['teacher']['schoolName'] 
          } else {
            entry['schoolName'] = entry['startedBy']['schoolName'] 
          }
        }

        console.log(this.projectList)
      }
    });


  }

  projectSelected() {
    this.selectedProject = this.projectSelectForm.value.selectedProject;
    this.isProjectSelected = true;
  }

  typeSelected(event) {
    let type = this.stringFormatter(event.target.value);

    switch (type) {
      case "quiz": {
        this.selectedTypeOfClass = 'quiz'
        break
      }
      case "ice-breaker game": {
        this.selectedTypeOfClass = 'ice-breaker'
        break
      }
      default: {
        this.selectedTypeOfClass = 'other'
        break
      }
    }
  }

  stringFormatter(text: string) {
    return text.toLowerCase();
  }

  selectArrangement(arrangement: string) {
    this.selectedArrangement = arrangement;
  }

  submitForm() {
    console.log(this.date.toLocaleDateString('en-CA')
    );
    console.log(this.selectedDuration);
    console.log(this.selectedArrangement)
    console.log(this.selectedProject.id);
    this.timeValue = this.planningSectionForm.value.selectedTime;

    // Format date / time
    let postDate = this.date;
    let timeSplit = this.timeValue.split(":")
    let epochTime = postDate.setHours(Number(timeSplit[0]),Number(timeSplit[1]))
    postDate = new Date(epochTime)
    console.log(postDate)

    let myBody: Body9= {
      "date": postDate,
      "duration": this.selectedDuration,
      "taskList": [],
      "groupAssignment": this.getGroupAssignment(),
    };

    // Send POST REQUEST
    this.meetingService.classesClassIdProjectsProjectIdMeetingsPost(myBody, 
      this.selectedClass.id,
      this.selectedProject.id,
      ).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  onDateSelected(event) {
    this.date = event.value;
  }

  durationSelected() {
    this.selectedDuration = this.planningSectionForm.value.selectedDuration;
  }

  getGroupAssignment() : Body9.GroupAssignmentEnum {
    if(this.selectedArrangement == 'tandem') {
      return Body9.GroupAssignmentEnum.Tandem
    } else {
      return Body9.GroupAssignmentEnum.WholeClass
    }
  }

}
