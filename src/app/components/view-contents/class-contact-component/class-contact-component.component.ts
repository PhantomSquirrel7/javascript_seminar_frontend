import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { report } from 'process';

@Component({
  selector: 'app-class-contact-component',
  templateUrl: './class-contact-component.component.html',
  styleUrls: ['./class-contact-component.component.less']
})
export class ClassContactComponentComponent{
  
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

    this.projectsService.classesClassIdProjectsPost(this.actClass.id, this.selfClass.id, "body", true).subscribe(
      data => this. sent = true
    );

    const source = timer(4000);
    source.subscribe(data => this.sent = false);

    this.contactTeacherForm.value.messageText = '';
    this.contactTeacherForm.value.messageText = null;
    this.messageTextValue = '';
  }

}

