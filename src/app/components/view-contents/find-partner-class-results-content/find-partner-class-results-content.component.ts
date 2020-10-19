import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ClassesService } from 'src/app/services/swagger-api/classes.service'
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
 
	ngOnInit() {
		this.findPartnerForm = this.fb.group({

		});
		this.resultClasses = history.state.data;
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
	}

}
