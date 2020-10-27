import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../../../services/swagger-api/api';

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
  	private userService: StudentsService
  ) { }

  recipient: any;

  ngOnInit(): void {
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
    
    

    console.log("Messages:");
    console.log(this.messages);
    
  }

}
