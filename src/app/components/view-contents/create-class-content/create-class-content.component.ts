import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '../../../services/custom/login/login.service';
import { ClassesService } from '../../../services/swagger-api/api';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';
import { COUNTRY_LIST } from '../../common/backend-util/common-structures/countries';
import { LANGUAGE_LEVEL_LIST } from '../../common/backend-util/common-structures/language-level';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  languageLevelList= null;
  selectedLanguageLevel = null;
  selectedLanguage = null;
  selectedClassCountry = null;
  
  constructor(
    private userService: CustomLoginService,
    private classService: ClassesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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


  createClassConfirmationDialog() : void {
    const message = `Are you sure you want to create class?`;
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
