import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@app/components';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import { StudentsService } from '../../../services/swagger-api/api';

@Component({
  selector: 'app-create-student-content',
  templateUrl: './create-student-content.component.html',
  styleUrls: ['./create-student-content.component.less']
})
export class CreateStudentContentComponent implements OnInit {

  studentForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private userService: CustomLoginService,
              private studentService : StudentsService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

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

  createStudentConfirmation() : void {
    const message = `Are you sure you want to create student?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true)
        this.onSubmit();
    });
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
