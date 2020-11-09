import { Component, OnInit } from '@angular/core';
import { StudentsService } from '@app/services/swagger-api/api';
import { CustomUserService } from '@app/services/custom';
import { flatMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User, Body14 } from '@app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-student-profile-content',
  templateUrl: './student-profile-content.component.html',
  styleUrls: ['./student-profile-content.component.less']
})
export class StudentProfileContentComponent implements OnInit {

  constructor(
    private studentService: StudentsService,
    private userService: CustomUserService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) { }

  user_student: any = {};
	loading = false; // true if waiting for results
  error = '';

  updateProfile: FormGroup;
  age: number;
  hobbies: string;
  notes: string;


  updateFormValues(){
    this.updateProfile.value.age = this.age;
    this.updateProfile.value.hobbies = this.hobbies;
    this.updateProfile.value.notes = this.notes;
  }

	ngOnInit() {
		this.updateProfile = this.fb.group({
      age: [this.age],
      hobbies: [this.hobbies],
      notes: [this.notes],
		});
		this.userService.getMe().subscribe({
			next: (response) => {
				this.loading = false;
        this.user_student = response;
        this.age = this.user_student.age;
        this.hobbies = this.user_student.hobbies;
        this.notes = this.user_student.notes;
        this.updateFormValues();
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
  
  onSubmit(){
    if (this.updateProfile.value.age){
      this.age = this.updateProfile.value.age;
    }
    if(this.updateProfile.value.hobbies){
      this.hobbies = this.updateProfile.value.hobbies;
    }
    if(this.updateProfile.value.notes){
      this.notes = this.updateProfile.value.notes;
    }
    
    var body = {
      "age": this.age,
      "hobbies": this.hobbies,
      "notes": this.notes,
      "proficiency_level": "C1" //cant be empty in the backend so this is a workaround
    }
    console.log(body);
    this.updateYourself(body);
  }
  

  updateYourself(body){
    this.userService.getMe().pipe(
      flatMap( (user) => 
        this.studentService.studentsStudentIdPatch(body, user.id).pipe(
          map(
            student => {
              return student;
            } 
          )
        )
      )
    ).subscribe({
      next: (response) => {
        this.loading = false;
        this._snackBar.open('Your information updated successfully !', 'Close', {
          duration: 3000
          });        
        this.user_student = response;
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
}
