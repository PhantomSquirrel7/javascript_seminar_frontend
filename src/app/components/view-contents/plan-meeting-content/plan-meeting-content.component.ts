import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-plan-meeting-content',
  templateUrl: './plan-meeting-content.component.html',
  styleUrls: ['./plan-meeting-content.component.less']
})
export class PlanMeetingContentComponent implements OnInit  { 

  clsSelecForm: FormGroup;

  user: User;
  error = '';
  isSelected = false;
  selectedClass: any; // Type Class

  user_classes = [ // Todo: Replace with API
    {
      classId: 1,
      className: "Class 1"
    },
    {
      classId: 2,
      className: "Class 2"
    },
    {
      classId: 3,
      className: "Class 3"
    }
  ]

  constructor(private fb: FormBuilder) {
  }
 
  ngOnInit() {
     this.clsSelecForm = this.fb.group({
      selectedClass: [null]
    });
  }

  classSelected(){
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isSelected = true;
  }  

}
