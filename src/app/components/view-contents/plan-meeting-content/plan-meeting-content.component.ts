import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';


@Component({
  selector: 'app-plan-meeting-content',
  templateUrl: './plan-meeting-content.component.html',
  styleUrls: ['./plan-meeting-content.component.less']
})
export class PlanMeetingContentComponent {
  user: User;
  error = '';
  selectedClass = null;
  isSelected = false;

  user_classes = [ // Todo: Replace with API
    {
      className: "Class 1"
    },
    {
      className: "Class 2"
    },
    {
      className: "Class 3"
    }
  ]

  ngOnInit(): void {
  }

  classSelected(){
    this.isSelected = true;
  }  

}
