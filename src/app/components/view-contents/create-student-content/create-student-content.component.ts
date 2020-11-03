import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { flatMap, map } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import {
  ClassesService,
  StudentsService,
} from '../../../services/swagger-api/api';

@Component({
  selector: 'app-create-student-content',
  templateUrl: './create-student-content.component.html',
  styleUrls: ['./create-student-content.component.less'],
})
export class CreateStudentContentComponent implements OnInit {
  studentForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  classList: any;
  selectedClassInformationId = null;

  constructor(
    private studentService: StudentsService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private classService: ClassesService
  ) {}

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      selectedClassInformationId: ['', Validators.required],
    });
    this.retrieveClassListOfTeacher();
  }

  retrieveClassListOfTeacher() {
    this.classService
      .classesGet()
      .toPromise()
      .then((response) => {
        this.classList = response;
      });
  }

  get f() {
    return this.studentForm.controls;
  }

  createStudentConfirmation(): void {
    const message = `Are you sure you want to create student?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) this.onSubmit();
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.submitted = true;
    if (this.studentForm.invalid) {
      this.loading = false;
      this.submitted = false;
      return;
    }
    this.loading = true;
    this.studentService
      .studentsPost({
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        password: this.f.password.value,
      })
      .pipe(
        flatMap((studentResponse) => {
          return this.classService.classesClassIdStudentsStudentIdPut(
            this.selectedClassInformationId,
            studentResponse.user.id  // "user" formerly "student"
          );
        })
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this._snackBar.open('Student created successfully !', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
  }
}
