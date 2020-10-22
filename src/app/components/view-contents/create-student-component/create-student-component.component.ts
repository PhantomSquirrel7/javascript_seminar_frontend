import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import { StudentsService } from '../../../services/swagger-api/api';

@Component({
  selector: 'app-create-student-component',
  templateUrl: './create-student-component.component.html',
  styleUrls: ['./create-student-component.component.less']
})
export class CreateStudentComponentComponent implements OnInit {

  studentForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private userService: CustomLoginService,
              private studentService : StudentsService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }
  get f() {
    return this.studentForm.controls;
  }

  onSubmit() : void{
    this.loading = true;
    this.submitted = true;
    if (this.studentForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;    
    this.studentService
      .studentsPost({ firstName : this.f.firstName.value, lastName: this.f.lastName.value, email: this.f.email.value, password: this.f.password.value })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.loading = false;
          this._snackBar.open('Student successfully created!', 'Close', {
            duration: 3000
          });
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
