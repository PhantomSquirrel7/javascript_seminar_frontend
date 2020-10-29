import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InlineResponse2001 } from '@app/models';
import { CustomLoginService } from '@app/services/custom/login/login.service';
import { first } from 'rxjs/operators';
import { ClassesService } from '../../../services/swagger-api/api';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';
import { COUNTRY_LIST } from '../../common/backend-util/common-structures/countries';
import { LANGUAGE_LEVEL_LIST } from '../../common/backend-util/common-structures/language-level';

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
  selectedClassInformationId = null;
  selectedStudentId: string;
  selectedClass = null;
  getClassInformationForm: FormGroup;
  getClassStudentsForm: FormGroup;
  selectedClassForm: FormGroup;

  languageList = null;
  countryList = null;
  languageLevelList = null;
  selectedClassStudentList = null;
  selectedLanguageLevel = null;
  selectedLanguage = null;
  selectedClassCountry = null;

  constructor(
    private classService: ClassesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: CustomLoginService,
      ) {}

  ngOnInit() {
    this.languageList = LANGUAGE_LIST;
    this.countryList = COUNTRY_LIST;
    this.languageLevelList = LANGUAGE_LEVEL_LIST;

    this.getClassInformationForm = this.formBuilder.group({
      selectedClassInformationId: ['', Validators.required],
    });

    this.getClassStudentsForm = this.formBuilder.group({
      selectedClassIdForStudentList: ['', Validators.required],
    });

    this.selectedClassForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: [''],
      subject: ['', Validators.required],
      selectedCountry: [''],
      projectDuration: ['', Validators.required],
      meetingFrequency: ['', Validators.required],
      level: ['', Validators.required],
      languageLevel: ['', Validators.required],
    });

    this.retrieveClassListOfTeacher();
  }

  get f() {
    return this.getClassInformationForm.controls;
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
    this.classService
      .classesClassIdGet(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
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

  updateClassInformation(): void {
    this.loading = true;
    this.submitted = true;
    this.classService
      .classesClassIdPut({
        id: this.selectedClassInformationId,
        name: this.f.name.value,
        language: this.selectedLanguage,
        subject: this.f.subject.value,
        country: this.selectedClassCountry,
        projectDuration: this.f.projectDuration.value,
        meetingFrequency: this.f.meetingFrequency.value,
        level: this.f.level.value,
        languageLevel: this.selectedLanguageLevel,
      }, this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
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

  deleteClass(): void {
    this.loading = true;
    this.submitted = true;
    this.classService
      .classesClassIdDelete(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.loading = false;
          this._snackBar.open('Class deleted successfully!', 'Close', {
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

  getStudentsOfClass(): void {
    this.loading = true;
    this.submitted = true;
    this.classService
      .classesClassIdStudentsGet(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.loading = false;
          this._snackBar.open('Students retrieved successfully!', 'Close', {
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

  removeStudentFromClass(): void {
    this.loading = true;
    this.submitted = true;
    this.classService
      .classesClassIdStudentsStudentIdDelete(
        this.selectedClassInformationId,
        this.selectedStudentId
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.loading = false;
          this._snackBar.open(
            'Student removed from class successfully!',
            'Close',
            {
              duration: 3000,
            }
          );
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

  addStudentToClass(): void {
    this.loading = true;
    this.submitted = true;
    this.classService
      .classesClassIdStudentsStudentIdPut(
        this.selectedClassInformationId,
        this.selectedStudentId
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.loading = false;
          this._snackBar.open(
            'Students added to class successfully!',
            'Close',
            {
              duration: 3000,
            }
          );
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
