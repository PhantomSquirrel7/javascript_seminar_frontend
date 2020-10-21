import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ClassesService } from 'src/app/services/swagger-api/classes.service'
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
		private _snackBar: MatSnackBar,
  	) { }

	myNewClass: any;

	findPartnerForm: FormGroup;

	user: User;
	loading = false; // true if waiting for results
	error = '';
	isSelected = false;
	selectedClass: any; // Type Class

	user_classes = [];

	user_lang_profs = ['Beginner (A1)', 'Beginner (A1)', 'Intermediate (B1)', 'Intermediate (B2)', 'Advanced (C1)', 'Advanced (C2)'];
	selectedLangProf: string;
	
	user_duration = ['1 day', '1 week', '2 weeks', '3 weeks', '4 weeks +'];
	selectedDuration: string;

	myClasses:any = [];

	resultClasses = [];

	contactClass: any;
 
	ngOnInit() {
		this.findPartnerForm = this.fb.group({
		selectedClass: [null],
		selectedLangProf: [],
		selectedDuration: []
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
		
	langProfSelected(){
		this.selectedLangProf = this.findPartnerForm.value.selectedLangProf;
	}
	
	durationSelected(){
		this.selectedDuration = this.findPartnerForm.value.selectedDuration;
	}

	onSubmit() {
		this.loading = true;
		
		// this.router.navigate(['find-partner-class/results']);

		console.log("Hello Api:");

		// this.myClasses = this.classService.classesClassIdFindGet(this.selectedClass.id).subscribe({
		this.myClasses = this.classService.classesGet().subscribe({
			next: (response) => {
				this.loading = false;
				this.resultClasses = response;
				console.log(this.resultClasses);
				this.router.navigate(['find-partner-class/results'], {state: {data: response}});
			},
			error: (error) => {
				this.error = error;
				this._snackBar.open(this.error, 'Close', {
				duration: 3000
				});
				this.loading = false;
			},
		});

		this.loading = false;
	}
}
