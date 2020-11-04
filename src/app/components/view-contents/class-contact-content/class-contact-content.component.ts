import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { report } from 'process';
import { Body10 } from '@app/models';

@Component({
  selector: 'app-class-contact-content',
  templateUrl: './class-contact-content.component.html',
  styleUrls: ['./class-contact-content.component.less']
})
export class ClassContactContentComponent{
  
  @Input() actClass: any;
  @Input() teacher: any;
  @Input() selfClass: any; // your class
	constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
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
    console.log("Self in modal:");
    console.log(this.selfClass);
  }

  teacherInfo(){ // TODO: redirect to teacher profile
    console.log(this.teacher.id);
  }

  onSubmit(){ // sent notification to other teacher
    console.log("Sending:");
    console.log(this.contactTeacherForm.value.messageText);
    // this.sent = true;

    console.log("Classes for Project:");
    console.log(this.actClass);
    console.log(this.selfClass);

    let myBody: Body10= {
      "_class": this.actClass.id.toString(),
      "initialMessage": this.contactTeacherForm.value.messageText
    };


    this.projectsService.classesClassIdProjectsPost(myBody, this.selfClass.id.toString()).subscribe(
      data => {
        console.log(data);
        this.sent = true;
      }
    );

    const source = timer(4000);
    source.subscribe(data => this.sent = false);

    this.contactTeacherForm.value.messageText = '';
    this.contactTeacherForm.value.messageText = null;
    this.messageTextValue = '';
  }

}

