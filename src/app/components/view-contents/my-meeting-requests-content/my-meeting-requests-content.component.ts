import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeetingsService } from '@app/services/swagger-api/meetings.service';
import { ClassesService } from '@app/services/swagger-api/classes.service';
import { ProjectsService } from '@app/services/swagger-api/projects.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-meeting-requests-content',
  templateUrl: './my-meeting-requests-content.component.html',
  styleUrls: ['./my-meeting-requests-content.component.less']
})
export class MyMeetingRequestsContentComponent implements OnInit {
  projectSelectForm: FormGroup;
  selectedClass: any; // Type Class
  clsSelecForm: FormGroup;
  selectedProject: any; // Type Project
  isClassSelected = false;
  isProjectSelected = false;
  projectList = [];
  meetingList: any;
  loading = false;
  user_classes = [];
  error = '';

  list1 = [    
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith'
  ];

  list2 = [    
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - The Empire Strikes Back'
  ];
 
  constructor(
    private fb: FormBuilder, 
    private projectService: ProjectsService,
    private meetingService: MeetingsService,
    private classService: ClassesService,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void {
    this.clsSelecForm = this.fb.group({
      selectedClass: [null]
    });
    this.projectSelectForm = this.fb.group({
      selectedProject: [null]
    });
    this.classService.classesGet().subscribe({
      next: (response) => {
        this.loading = false;
        this.user_classes = response;
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

  classSelected(){
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isClassSelected = true;
    this.isProjectSelected = false;

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

  projectSelected(){
    this.selectedProject = this.projectSelectForm.value.selectedProject;
    this.isProjectSelected = true;
    this.fetchMeetings();
  }  

  fetchMeetings() {
    const classID = this.selectedClass.id
    const projectID = this.selectedProject.id

    this.meetingService.classesClassIdProjectsProjectIdMeetingsGet(classID, projectID).subscribe({
      next: (response) => {
        this.meetingList = response;
        this.loading = false;
        console.log(this.meetingList)
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


  drop(event: CdkDragDrop<string[]>, list) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }

  saveArrangement() {
    console.log(this.list1)
    console.log(this.list2)
  }

  deleteMeeting(meetingId) {
    // TODO
    console.log('class'+this.selectedClass.id);
    console.log('project'+this.selectedProject.id);
    console.log(meetingId);
  }
}
