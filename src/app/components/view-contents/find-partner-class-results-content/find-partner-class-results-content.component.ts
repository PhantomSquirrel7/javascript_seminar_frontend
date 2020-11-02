import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { StudentsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/swagger-api/classes.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-find-partner-class-results-content',
  templateUrl: './find-partner-class-results-content.component.html',
  styleUrls: ['./find-partner-class-results-content.component.less']
})
export class FindPartnerClassResultsContentComponent implements OnInit {

	constructor(
    private fb: FormBuilder,
    private router: Router,
	private userService: StudentsService
  	) { }


	findPartnerForm: FormGroup;

	user: User;
	loading = false; // true if waiting for results
	details = false; // true if details for class are requestet else false
	error = '';
	isSelected = false;
	selectedClass: any; // Type Class

	user_lang_profs = ['Beginner (A1)', 'Beginner (A1)', 'Intermediate (B1)', 'Intermediate (B2)', 'Advanced (C1)', 'Advanced (C2)'];
	selectedLangProf: string;
	
	user_duration = ['1 day', '1 week', '2 weeks', '3 weeks', '4 weeks +'];
	selectedDuration: string;

	myClasses:any = [];

	resultClasses = [];

	contactClass: any = {};

	contactTeacher: any = {};

	selfClass: any = {};
 
	ngOnInit() {
		this.findPartnerForm = this.fb.group({

		});
		this.resultClasses = history.state.data;
		console.log("Self:");
		console.log(history.state.selfClass);
		this.selfClass = history.state.selfClass;
	}

	classSelected(){
		this.selectedClass = this.findPartnerForm.value.selectedClass;
		this.isSelected = true;
	}
	
	langProfSelected(){
		this.selectedLangProf = this.findPartnerForm.value.selectedLangProf;
	}
	
	durationSelected(){
		this.selectedDuration = this.findPartnerForm.value.selectedDuration;
	}

	adjustCriteria(){
		console.log("adjust it!");
		
    this.loading = true;
    
		this.router.navigate(['find-partner-class']);
		// TODO: API Call for results
		this.loading = false;

  }

	detailsFor(actClass){
		this.details = true;
		this.contactClass = actClass;
		this.contactTeacher = actClass.teacher;

		// TODO: replace when allowed from backend
		// this.contactTeacher = {
		// 	"email": "test@mail.de",
		// 	"schoolName": "test school",
		// 	"firstName": "Peter",
		// 	"lastName": "Tester",
		// 	"role": "teacher",
		// 	"id": "5f685056d6bf4e0016d9931e"
		// }
		// console.log("Details For: ");
		// console.log(actClass);
		// this.userService.studentsStudentIdGet(actClass.teacher).subscribe({
		// 	next: (response) => {
		// 		this.contactTeacher = response;
		// 	},
		// 	error: (error) => {
		// 	  console.log(error);
		// 	},
		// });

	}

	// teacherOfContactClass(actClass){
	// 	return this.userService.studentsStudentIdGet(actClass.teacher).subscribe({
	// 		next: (response) => {
	// 			return response;
	// 		},
	// 		error: (error) => {
	// 		  console.log(error);
	// 		},
	// 	  });
	// }
}
