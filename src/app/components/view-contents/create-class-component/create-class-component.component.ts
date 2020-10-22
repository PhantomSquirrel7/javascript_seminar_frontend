import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import { ClassesService } from '../../../services/swagger-api/api';

@Component({
  selector: 'app-create-class-component',
  templateUrl: './create-class-component.component.html',
  styleUrls: ['./create-class-component.component.less']
})
export class CreateClassComponentComponent implements OnInit {

  createClassForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private userService: CustomLoginService,
              private classService : ClassesService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createClassForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      language: ['', Validators.required],
      subject: ['', Validators.required],
      country: ['', Validators.required],
      projectDuration: ['', Validators.required],
      meetingFrequency: ['', Validators.required],
      level: ['', Validators.required],
      languageLevel: ['', Validators.required]

    });

  }
  get f() {
    return this.createClassForm.controls;
  }

  onSubmit() : void{
    this.loading = true;
    this.submitted = true;
    if (this.createClassForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;   
    this.classService
      .classesPost({
        id: this.f.id.value,
        name: this.f.name.value, 
        language: this.f.language.value,
        subject: this.f.subject.value,
        country: this.f.country.value,
        projectDuration: this.f.projectDuration.value,
        meetingFrequency: this.f.meetingFrequency.value,
        level: this.f.levle.value,
        languageLevel: this.f.languageLevel.value,
        teacher : {
        },
        students: []
      })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.loading = false;
          this._snackBar.open('Class successfully created!', 'Close', {
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
