import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-class-contact-component',
  templateUrl: './class-contact-component.component.html',
  styleUrls: ['./class-contact-component.component.less']
})
export class ClassContactComponentComponent{
  
  @Input() actClass: any;
  @Input() teacher: any;
	constructor(
		private fb: FormBuilder
  ) { }

  contactTeacherForm: FormGroup;
  sent = false;
  messageTextValue = "";

  timeLeft: number = 60;
  interval;
  subscribeTimer: any;

  ngOnInit() {
    this.contactTeacherForm = this.fb.group({
      messageText: [""]
    });
  }

  teacherInfo(){ // TODO: redirect to teacher profile
    console.log(this.teacher.id);
  }

  onSubmit(){ // sent notification to other teacher
    console.log("Sending:");
    console.log(this.contactTeacherForm.value.messageText);
    this.sent = true;

    const source = timer(4000);
    source.subscribe(data => this.sent = false);

    this.contactTeacherForm.value.messageText = '';
    this.contactTeacherForm.value.messageText = null;
    this.messageTextValue = '';
  }

}

