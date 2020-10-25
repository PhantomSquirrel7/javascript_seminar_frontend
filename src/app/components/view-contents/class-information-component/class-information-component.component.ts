import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InlineResponse2001 } from '@app/models';
import { CustomLoginService } from '@app/services/custom/login/login.service';
import { first } from 'rxjs/operators';
import { ClassesService, StudentsService } from '../../../services/swagger-api/api';

@Component({
  selector: 'app-class-information-component',
  templateUrl: './class-information-component.component.html',
  styleUrls: ['./class-information-component.component.less'],
})
export class ClassInformationComponentComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  classList: InlineResponse2001[];
  selectedClassId;
  getClassForm: FormGroup;

  constructor(
    private classService: ClassesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: CustomLoginService,
  ) {}

  ngOnInit() {
    this.getClassForm = this.formBuilder.group({
      selectedClassId: ['', Validators.required]
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

  getClassInformation(): void {
    this.loading = true;
    this.submitted = true;
    this.loading = true;
    this.classService
      .classesClassIdGet("5f93e6bff27d5000162cfb1a")
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.loading = false;
          this._snackBar.open('Class information retrieved!', 'Close', {
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
