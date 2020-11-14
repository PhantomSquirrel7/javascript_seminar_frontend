import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import { ClassesService } from '../../../services/swagger-api/api';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';
import { COUNTRY_LIST } from '../../common/backend-util/common-structures/countries';
import { LANGUAGE_LEVEL_LIST } from '../../common/backend-util/common-structures/language-level';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CLASS_LEVEL } from '../../../components/common/backend-util/common-structures/class-level';
import { MEETING_FREQUENCY } from '../../../components/common/backend-util/common-structures/meeting-frequency';
import { PROJECT_DURATION } from '../../../components/common/backend-util/common-structures/project-duration';
import { SUBJECT } from '@app/components/common/backend-util/common-structures/subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-class-content',
  templateUrl: './create-class-content.component.html',
  styleUrls: ['./create-class-content.component.less'],
})
export class CreateClassContentComponent implements OnInit {
  createClassForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  languageList = null;
  countryList = null;
  languageLevelList = null;
  classLevelList = null;
  frequencyList = null;
  projectDurationList = null;
  subjectList = null;
  selectedClassLevel = null;
  selectedFrequency = null;
  selectedProjectDuration = null;
  selectedLanguageLevel = null;
  selectedLanguage = null;
  selectedClassCountry = null;
  selectedSubject = null;

  constructor(
    private userService: CustomLoginService,
    private classService: ClassesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.languageList = LANGUAGE_LIST;
    this.countryList = COUNTRY_LIST;
    this.languageLevelList = LANGUAGE_LEVEL_LIST;
    this.classLevelList = CLASS_LEVEL;
    this.frequencyList = MEETING_FREQUENCY;
    this.projectDurationList = PROJECT_DURATION;
    this.subjectList = SUBJECT;
    this.selectedSubject = this.subjectList[0].value;
    this.selectedLanguageLevel = this.languageLevelList[0];
    this.selectedLanguage = this.languageList[0].value;
    this.selectedClassCountry = this.countryList[0].code;
    this.selectedClassLevel = this.classLevelList[0].value;
    this.selectedFrequency = this.frequencyList[0].value;
    this.selectedProjectDuration = this.projectDurationList[0].value;

    this.createClassForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: [''],
      subject: [''],
      selectedCountry: [''],
      projectDuration: ['', Validators.required],
      meetingFrequency: ['', Validators.required],
      level: ['', Validators.required],
      languageLevel: ['', Validators.required],
    });
  }
  get f() {
    return this.createClassForm.controls;
  }

  createClassConfirmationDialog(): void {
    const message = `Are you sure you want to create class?`;
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
    if (this.createClassForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    let teacher = {
      email: this.userService.userValue.email,
      firstName: this.userService.userValue.firstName,
      lastName: '',
      role: this.userService.userValue.role,
    };
    this.classService
      .classesPost({
        name: this.f.name.value,
        language: this.selectedLanguage,
        subject: this.selectedSubject,
        country: this.selectedClassCountry,
        projectDuration: this.selectedProjectDuration,
        meetingFrequency: this.selectedFrequency,
        level: this.selectedClassLevel,
        languageLevel: this.selectedLanguageLevel,
      })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.loading = false;
          this._snackBar.open('Class successfully created!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['class-information'])
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
