import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ClassesService } from 'src/app/services/swagger-api/classes.service'
import { MetaService } from 'src/app/services/swagger-api/meta.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-find-partner-class-content',
  templateUrl: './find-partner-class-content.component.html',
  styleUrls: ['./find-partner-class-content.component.less']
})
export class FindPartnerClassContentComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private classService: ClassesService,
		private countryService: MetaService,
		private _snackBar: MatSnackBar,
  	) { }

	myNewClass: any;

	findPartnerForm: FormGroup;

	user: User;
	loading = false; // true if waiting for results
	error = '';
	isSelected = false;
	selectedClass: any; // Type Class
	submitted = false;
	classError = false;

	user_classes = [];

	user_lang_profs = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
	selectedLangProf: string;
	
	// user_duration = ['1', '1 week', '2 weeks', '3 weeks', '4 weeks +'];
	projectDuration: string = "";

	meetingFrequency: string = "";
	
	user_country = [];
	selectedCountry: any;

	myClasses:any = [];

	resultClasses = [];

	contactClass: any;

 
	ngOnInit() {
		this.findPartnerForm = this.fb.group({
		selectedClass: [null],
		// selectedLangProf: [],
		projectDuration: [],
		selectedCountry: [],
		meetingFrequency: [],
		});

		this.countryService.countriesGet().subscribe({
			next: (response) => {
				this.loading = false;
				this.user_country = response;
				this.selectedCountry = "";
			},
			error: (error) => {
				this.error = error;
				this._snackBar.open(this.error, 'Close', {
				duration: 3000
				});
				this.loading = false;
			},
		});

		this.classService.classesGet().subscribe({
			next: (response) => {
				this.loading = false;
				this.user_classes = response;
				console.log(this.user_classes[0]);
			},
			error: (error) => {
				this.error = error;
				this._snackBar.open(this.error, 'Close', {
				duration: 3000
				});
				this.loading = false;
			},
		});
	}

	classSelected(){
		this.selectedClass = this.findPartnerForm.value.selectedClass;
		this.isSelected = true;
	}
		
	// langProfSelected(){
	// 	this.selectedLangProf = this.findPartnerForm.value.selectedLangProf;
	// }
	
	// durationSelected(){
	// 	this.selectedDuration = this.findPartnerForm.value.selectedDuration;
	// }	
	
	countrySelected(){
		console.log("Country:");
		
		console.log(this.findPartnerForm.value.selectedCountry);
		this.selectedCountry = this.findPartnerForm.value.selectedCountry;
	}

	onSubmit() {
		this.loading = true;
		this.submitted = true;
		
		if (this.selectedClass){
			console.log("Hello Api:");
			console.log(this.findPartnerForm.value);
			console.log(this.selectedClass.id);
			console.log(this.findPartnerForm.value.projectDuration);
			console.log(this.findPartnerForm.value.meetingFrequency);
			console.log(this.selectedCountry);
			
			if (this.findPartnerForm.value.projectDuration == null || this.findPartnerForm.value.meetingFrequency == null || this.selectedCountry == ""){
				this.myClasses = this.classService.classesClassIdFindGet(this.selectedClass.id).subscribe({
					next: (response) => {
						this.loading = false;
						this.resultClasses = response;
						console.log(this.resultClasses);
						this.router.navigate(['find-partner-class/results'], {state: {data: response, selfClass: this.selectedClass}});
					},
					error: (error) => {
						this.error = error;
						this._snackBar.open(this.error, 'Close', {
						duration: 3000
						});
						this.loading = false;
					},
				});
			}
			else{
				this.myClasses = this.classService.classesClassIdFindGet(this.selectedClass.id, this.findPartnerForm.value.projectDuration.toString(), this.findPartnerForm.value.meetingFrequency.toString(), this.selectedCountry.code.toString()).subscribe({
					next: (response) => {
						this.loading = false;
						this.resultClasses = response;
						console.log("Search with parameter:")
						console.log(this.resultClasses);
						this.router.navigate(['find-partner-class/results'], {state: {data: response, selfClass: this.selectedClass}});
					},
					error: (error) => {
						this.error = error;
						this._snackBar.open(this.error, 'Close', {
						duration: 3000
						});
						this.loading = false;
					},
				});
			}
	
			this.loading = false;
		}
		else{
			console.log("ERROR!");
			
			this.classError = true;
			this.loading = false;
		}

	}
}
