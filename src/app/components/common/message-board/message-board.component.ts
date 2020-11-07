import { Component, OnInit, Input } from '@angular/core';
import { StudentsService, ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { CompileMetadataResolver } from '@angular/compiler';
import { Body11 } from '@app/models';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.less']
})
export class MessageBoardComponent implements OnInit {

  @Input() sender:any;
  @Input() recipient:any;
  @Input() myClass: any;
  @Input() myProject: any;
  constructor(
  	private userService: StudentsService,
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  messages: any[] = [];

  contactTeacherForm: FormGroup;
  sent = false;
  sending = false;
  messageTextValue = "";

  timeLeft: number = 60;
  interval;
  subscribeTimer: any;

  ngOnInit(): void {
    this.projectsService.classesClassIdProjectsProjectIdMessagesGet(this.sender.id, this.myProject.id).subscribe(
      data => {
        console.log("Messages resp:");
        console.log(data);
        this.messages = data;
        this.messages = this.messages.sort( (a, b) => {
          return Number(a.timestamp) - Number(b.timestamp)
        });
      }
    );
    
    this.contactTeacherForm = this.fb.group({
      messageText: [""]
    });

    
    console.log("Sender:");
    console.log(this.sender);    
    
    
    
    console.log("Recipient:");
    console.log(this.recipient);
 
  }


  ngOnChanges(){
    console.log("Changes detected!");
    this.loadMessages("noFlag")
  }


  onSubmit(){ // sent notification to other teacher
    console.log("Sending:");
    console.log(this.contactTeacherForm.value.messageText);
    // this.sent = true;
    this.sending = true;
    let msgObj: Body11 = {
      "message": this.contactTeacherForm.value.messageText,
      "from": this.sender.id.toString(),
      "to": this.recipient.id.toString()
    };

    this.projectsService.classesClassIdProjectsProjectIdMessagesPost(msgObj, this.myClass.id.toString(), this.myProject.id.toString()).subscribe(
      data => {
        console.log("Answer sending:")
        console.log(data);
        this.loadMessages("flag");
        // const source = timer(4000);
        // source.subscribe(data => this.sent = false);
      }
    );

    this.contactTeacherForm.value.messageText = '';
    this.contactTeacherForm.value.messageText = null;
    this.messageTextValue = '';
  }


  getTime(timestamp){
    let myTimestamp = new Date(timestamp);
    return myTimestamp.toLocaleString()
  }

  loadMessages(flag){
    this.projectsService.classesClassIdProjectsProjectIdMessagesGet(this.sender.id, this.myProject.id).subscribe(
      data => {
        console.log("Messages resp:");
        console.log(data);
        this.messages = data;
        this.messages = this.messages.sort( (a, b) => {
          return Number(a.timestamp) - Number(b.timestamp)
        });
        if (flag != "noFlag"){
          this.sending = false;
          this.sent = true;
        }
        const source = timer(3000);
        source.subscribe(data => this.sent = false);
      }
    );
  }

}
