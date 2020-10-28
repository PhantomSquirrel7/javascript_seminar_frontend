import { Component, OnInit, Input } from '@angular/core';
import { StudentsService, ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { CompileMetadataResolver } from '@angular/compiler';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.less']
})
export class MessageBoardComponent implements OnInit {

  @Input() sender:any;
  @Input() recipientId:any;
  @Input() messages:any[];
  constructor(
  	private userService: StudentsService,
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  recipient: any;

  contactTeacherForm: FormGroup;
  sent = false;
  messageTextValue = "";

  timeLeft: number = 60;
  interval;
  subscribeTimer: any;

  ngOnInit(): void {
    this.contactTeacherForm = this.fb.group({
      messageText: [""]
    });

    // TODO: replace when allowed from backend
		this.recipient = {
			"email": "test1@mail.de",
			"schoolName": "test school",
			"firstName": "Petra",
			"lastName": "Tester",
			"role": "teacher",
			"id": "000000000"
		}
		// this.userService.studentsStudentIdGet(this.recipientId).subscribe({
		// 	next: (response) => {
		// 		this.recipient = response;
		// 	},
		// 	error: (error) => {
		// 	  console.log(error);
		// 	},
		// });
    
    
    console.log("Sender:");
    console.log(this.sender);    
    
    
    
    console.log("Recipient:");
    console.log(this.recipient);
    
    this.messages = this.messages.sort( (a, b) => {
      return Number(a.timestamp) - Number(b.timestamp)
    });
    console.log("Messages (sorted):");
    console.log(this.messages);    
  }


  onSubmit(){ // sent notification to other teacher
    console.log("Sending:");
    console.log(this.contactTeacherForm.value.messageText);
    // this.sent = true;

    this.projectsService.classesClassIdProjectsPost(this.recipientId, this.sender.id).subscribe(
      data => this. sent = true
    );

    const source = timer(4000);
    source.subscribe(data => this.sent = false);

    this.contactTeacherForm.value.messageText = '';
    this.contactTeacherForm.value.messageText = null;
    this.messageTextValue = '';
  }


  getTime(timestamp){
    let myTimestamp = new Date(Number(timestamp));
    return myTimestamp.toLocaleString()
  }

}
