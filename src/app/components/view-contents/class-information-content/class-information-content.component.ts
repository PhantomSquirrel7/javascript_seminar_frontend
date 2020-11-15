import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InlineResponse2001 } from '@app/models';
import { CustomLoginService } from '@app/services/custom/login/login.service';
import { first } from 'rxjs/operators';
import {
  ClassesService,
  StudentsService,
  UserService,
} from '../../../services/swagger-api/api';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';
import { COUNTRY_LIST } from '../../common/backend-util/common-structures/countries';
import { LANGUAGE_LEVEL_LIST } from '../../common/backend-util/common-structures/language-level';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CLASS_LEVEL } from '@app/components/common/backend-util/common-structures/class-level';
import { MEETING_FREQUENCY } from '@app/components/common/backend-util/common-structures/meeting-frequency';
import { PROJECT_DURATION } from '@app/components/common/backend-util/common-structures/project-duration';
import { SUBJECT } from '@app/components/common/backend-util/common-structures/subject';

export interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  flag: boolean;
  email: string;
}

@Component({
  selector: 'app-class-information-content',
  templateUrl: './class-information-content.component.html',
  styleUrls: ['./class-information-content.component.less'],
})
export class ClassInformationContentComponent implements OnInit {
  displayedColumns: string[] = [
    'Assigned to class ?',
    'Name',
    'Surname',
    'E-mail',
    'Delete Button',
  ];
  dataSource: MatTableDataSource<StudentData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  getClassLoading = false;
  getClassSubmitted = false;

  updateClassLoading = false;
  updateClassSubmitted = false;

  deleteClassLoading = false;
  deleteClassSubmitted = false;

  getClassStudentLoading = false;
  concatStudentsLoaded = false;

  insertClassStudentsLoading = false;
  insertClassStudentsSubmitted = false;

  updateClassStudentsLoading = false;
  updateClassStudentsSubmitted = false;

  deleteStudentLoading = false;

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
  classLevelList = null;
  frequencyList = null;
  projectDurationList = null;
  subjectList = null;
  selectedLanguageLevel = null;
  selectedLanguage = null;
  selectedClassCountry = null;
  selectedClassIdForStudentList = null;
  selectedClassLevel = null;
  selectedFrequency = null;
  selectedProjectDuration = null;
  selectedSubject = null;
  studentsOfTeacher = null;

  constructor(
    private classService: ClassesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: CustomLoginService,
    private studentService: StudentsService,
    private userApi: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.languageList = LANGUAGE_LIST;
    this.countryList = COUNTRY_LIST;
    this.languageLevelList = LANGUAGE_LEVEL_LIST;
    this.classLevelList = CLASS_LEVEL;
    this.frequencyList = MEETING_FREQUENCY;
    this.projectDurationList = PROJECT_DURATION;
    this.subjectList = SUBJECT;

    this.getClassInformationForm = this.formBuilder.group({
      selectedClassInformationId: ['', Validators.required],
    });

    this.getClassStudentsForm = this.formBuilder.group({
      selectedClassIdForStudentList: ['', Validators.required],
    });

    this.selectedClassForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: [''],
      subject: [''],
      selectedCountry: [''],
      projectDuration: ['', Validators.required],
      meetingFrequency: ['', Validators.required],
      level: ['', Validators.required],
      languageLevel: ['', Validators.required],
    });

    this.retrieveClassListOfTeacher();
  }
  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get f() {
    return this.selectedClassForm.controls;
  }

  retrieveClassListOfTeacher() {
    this.classService
      .classesGet()
      .toPromise()
      .then((response) => {
        this.classList = response;
        if (this.classList.length != 0) {
          this.selectedClassInformationId = this.classList[0].id;
          this.selectedClassIdForStudentList = this.classList[0].id;
        }
      });
  }

  getClassInformation(): void {
    this.getClassLoading = true;
    this.getClassSubmitted = true;
    this.classService
      .classesClassIdGet(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.selectedLanguage = this.languageList.find(
            (item) => item.value == this.selectedClass.language
          );
          this.selectedLanguageLevel = this.selectedClass.languageLevel;
          this.selectedClassCountry = this.countryList.find(
            (item) => item.code == this.selectedClass.country
          );
          let tempFreq = this.frequencyList.find(
            (item) => item.value == this.selectedClass.meetingFrequency
          );
          this.selectedFrequency = tempFreq ? tempFreq.value : null;
          let tempClassLevel = this.classLevelList.find(
            (item) => item.value == this.selectedClass.level
          );
          this.selectedClassLevel = tempClassLevel
            ? tempClassLevel.value
            : null;

          let tempSubject = this.subjectList.find(
            (item) => item.value == this.selectedClass.subject
          );
          this.selectedSubject = tempSubject? tempSubject.value : null;
          let tempProjectDuration = this.projectDurationList.find(
            (item) => item.value == this.selectedClass.projectDuration
          );
          this.selectedProjectDuration = tempProjectDuration
            ? tempProjectDuration.value
            : null;
          this.getClassLoading = false;
          this._snackBar.open('Class information retrieved!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.getClassLoading = false;
          this.getClassSubmitted = false;
        },
      });
  }

  openUpdateConfirmationDialog(): void {
    const message = `Are you sure you want to update class?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) this.updateClassInformation();
    });
  }

  updateClassInformation(): void {
    this.updateClassLoading = true;
    this.updateClassStudentsSubmitted = true;
    this.classService
      .classesClassIdPut(
        {
          name: this.f.name.value,
          language: this.selectedLanguage.value,
          subject: this.selectedSubject,
          country: this.selectedClassCountry.code,
          projectDuration: this.selectedProjectDuration,
          meetingFrequency: this.selectedFrequency,
          level: this.selectedClassLevel,
          languageLevel: this.selectedLanguageLevel,
        },
        this.selectedClassInformationId
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.updateClassLoading = false;
          this._snackBar.open('Class updated!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.updateClassLoading = false;
        },
      });
  }

  openDeleteConfirmationDialog(): void {
    const message = `Are you sure you want to delete class?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) this.deleteClass();
    });
  }

  openDeleteStudentConfirmationDialog(index): void {
    const message = `Are you sure you want to delete student?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true)
        this.deleteStudent(this.studentsOfTeacher[index].id);
    });
  }

  deleteStudent(studentId): void {
    this.deleteClassLoading = true;
    this.studentService
      .studentsStudentIdDelete(studentId)
      .toPromise()
      .then((response) => {
        this._snackBar.open('Student Deleted!', 'Close', {
          duration: 3000,
        });     
        this.deleteClassLoading = false;
        this.generateStudentList();
      })
      .catch((error) => {
        this.deleteClassLoading = false;
        this.error = error;
        this._snackBar.open(this.error, 'Close', {
          duration: 3000,
        });
      });
  }

  deleteClass(): void {
    this.deleteClassLoading = true;
    this.classService
      .classesClassIdDelete(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.deleteClassLoading = false;
          this._snackBar.open('Class deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.generateStudentList();
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.deleteClassLoading = false;
        },
      });
  }

  generateStudentList(): void {
    this.concatStudentsLoaded = false;
    this.getClassStudentLoading = true;
    this.userApi
      .meStudentsGet()
      .toPromise()
      .then((meStudentsResponse) => {
        this.classService
          .classesClassIdStudentsGet(this.selectedClassIdForStudentList)
          .toPromise()
          .then((studentsOfClassResponse) => {
            this.getClassStudentLoading = false;
            this.findConcatOfStudents(
              meStudentsResponse,
              studentsOfClassResponse
            );
          })
          .catch((error) => {
            this.getClassStudentLoading = false;
            this.error = error;
            this._snackBar.open(this.error, 'Close', {
              duration: 3000,
            });
          });
      });
  }

  findConcatOfStudents(studentsOfTeacher, studentsOfClass) {
    studentsOfTeacher.forEach((element) => {
      let found = studentsOfClass.find((item) => item.id == element.id);
      if (found) element.flag = true;
      else element.flag = false;
      delete element.role;
    });
    this.studentsOfTeacher = studentsOfTeacher;
    this.dataSource = new MatTableDataSource(this.studentsOfTeacher);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 0);
    this.concatStudentsLoaded = true;
  }

  toggleStudentCheckBox(studentId) {
    let index = this.studentsOfTeacher.findIndex(
      (item) => item.id == studentId
    );
    this.studentsOfTeacher[index].flag = !this.studentsOfTeacher[index].flag;
    if (this.studentsOfTeacher[index].flag)
      this.addStudentToClass(this.studentsOfTeacher[index]);
    else this.removeStudentFromClass(this.studentsOfTeacher[index]);
  }

  removeStudentFromClass(student): void {
    this.updateClassStudentsLoading = true;
    this.classService
      .classesClassIdStudentsStudentIdDelete(
        this.selectedClassIdForStudentList,
        student.id
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.updateClassStudentsLoading = false;
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
          this.updateClassStudentsLoading = false;
        },
      });
  }

  addStudentToClass(student): void {
    this.updateClassStudentsLoading = true;
    this.updateClassStudentsSubmitted = true;
    this.classService
      .classesClassIdStudentsStudentIdPut(
        this.selectedClassIdForStudentList,
        student.id
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.updateClassStudentsLoading = false;
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
          this.updateClassStudentsLoading = false;
        },
      });
  }

  navigateTo(pageName: string) {
    switch (pageName) {
      case 'createClassPage': {
        this.router.navigate(['/create-class']);
        break;
      }
      case 'createStudentPage': {
        this.router.navigate(['/create-student']);
        break;
      }
    }
  }
}
