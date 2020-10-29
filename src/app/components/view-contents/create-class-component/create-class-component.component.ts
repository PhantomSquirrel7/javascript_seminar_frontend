import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import { ClassesService } from '../../../services/swagger-api/api';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';
import { COUNTRY_LIST } from '../../common/backend-util/common-structures/countries';
import { LANGUAGE_LEVEL_LIST } from '../../common/backend-util/common-structures/language-level';

@Component({
  selector: 'app-create-class-component',
  templateUrl: './create-class-component.component.html',
  styleUrls: ['./create-class-component.component.less'],
})
export class CreateClassComponentComponent implements OnInit {
  createClassForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  languageList = null;
  countryList = null;
  languageLevelList= null;
  selectedLanguageLevel = null;
  selectedLanguage = null;
  selectedClassCountry = null;
  
  constructor(
    private userService: CustomLoginService,
    private classService: ClassesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.languageList = LANGUAGE_LIST;
    this.countryList = COUNTRY_LIST;
    this.languageLevelList = LANGUAGE_LEVEL_LIST;

    this.createClassForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: [''],
      subject: ['', Validators.required],
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
        subject: this.f.subject.value,
        country: this.selectedClassCountry,
        projectDuration: this.f.projectDuration.value,
        meetingFrequency: this.f.meetingFrequency.value,
        level: this.f.level.value,
        languageLevel: this.selectedLanguageLevel,
      })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.loading = false;
          this._snackBar.open('Class successfully created!', 'Close', {
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
