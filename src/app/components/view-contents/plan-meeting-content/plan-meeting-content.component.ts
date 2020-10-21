import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/swagger-api/classes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-plan-meeting-content',
  templateUrl: './plan-meeting-content.component.html',
  styleUrls: ['./plan-meeting-content.component.less']
})
export class PlanMeetingContentComponent implements OnInit  { 
  lists = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
  ];

  clsSelecForm: FormGroup;

  user: User;
  error = '';
  isSelected = false;
  selectedClass: any; // Type Class
  selectedTypeOfClass = ''
  selectedDuration: number;
  durations = [30, 45, 60, 90, 120];
  typeOfClasses = ['Quiz','Ice-Breaker Game','Others',]
  loading = false;

  user_classes = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ClassesService,
    private _snackBar: MatSnackBar,
  ) {}
 
  ngOnInit() {
    this.clsSelecForm = this.fb.group({
      selectedClass: [null]
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

  classSelected(){
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isSelected = true;
  }  

  typeSelected(event) {
    let type = this.stringFormatter(event.target.value);

    switch(type) {
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
}
