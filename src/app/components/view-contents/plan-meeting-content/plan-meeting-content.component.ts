import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/swagger-api/classes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProjectsService } from '@app/services/swagger-api/projects.service';


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

  user: User;
  error = '';
  isClassSelected = false;
  selectedClass: any; // Type Class
  selectedTypeOfTask = ''
  selectedDuration: number;
  durations = [30, 45, 60, 90, 120];
  date: Date;
  typeOfTasks = ['Quiz', 'Alias', 'Draw-It', '2 Truths 1 Lie', 'Simple Task']
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
      selectedDuration: [null]
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
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isClassSelected = true;
    this.isProjectSelected = false;
    console.log('teacher:' + this.selectedClass.id)

    this.projectService.classesClassIdProjectsGet(this.selectedClass.id).subscribe({
      next: (response) => {
        this.projectList = response;
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
        this.selectedTypeOfTask = 'quiz'
        break
      }
      case "alias": {
        this.selectedTypeOfTask = 'alias'
        break
      }
      case "draw-it": {
        this.selectedTypeOfTask = 'draw-it'
        break
      }
      case "2 truths 1 lie": {
        this.selectedTypeOfTask = '2t1l'
        break
      }
      default: {
        this.selectedTypeOfTask = 'simple-task'
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
    console.log(this.date);
    console.log(this.selectedDuration);
    console.log(this.selectedArrangement)
    console.log(this.selectedProject.id);
  }

  onDateSelected(event) {
    this.date = event.value;
  }

  durationSelected() {
    this.selectedDuration = this.planningSectionForm.value.selectedDuration;
  }
}
