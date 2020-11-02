import { Component, Input, OnInit } from '@angular/core';
import { first, flatMap, map } from 'rxjs/operators';
import { User } from '@app/models';
import { CustomUserService } from '@app/services/custom';
import { ClassesService, ProjectsService } from '@app/services/swagger-api/api';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-connection-requests-content',
  templateUrl: './my-connection-requests-content.component.html',
  styleUrls: ['./my-connection-requests-content.component.less']
})
export class MyConnectionRequestsContentComponent implements OnInit {

  constructor(
    private userService: CustomUserService, 
    private _snackBar : MatSnackBar, 
    private classService: ClassesService,
    private projectService: ProjectsService,
    private fb: FormBuilder,
  ) { }

  requestInfoForm: FormGroup;

  loading = false;
  allDataLoaded = false;

  error = '';
  user: User;
  user_classes: any[];
  user_projects: any[] = [];

  actClass: any = {};
  actProject: any = {};
  exchangeTeacher: any = {};


  exampleProject1 = {
    "id": "projectId1",
    "classes": [
      {
        "id": "5f8c63862d6a720016449f23",
        "name": "Class 1",
        "language": "en",
        "country": "DE",
        "projectDuration": 10,
        "meetingFrequency": 2,
        "languageLevel": "A1",
        "subject": "mathematics",
        "topics": [
          "addition",
          "subtraction"
        ],
        "teacher": "id",
        "level": 2
      },
      {
        "id": "class2id",
        "name": "Class 2",
        "language": "en",
        "country": "DE",
        "projectDuration": 10,
        "meetingFrequency": 2,
        "languageLevel": "A1",
        "subject": "mathematics",
        "topics": [
          "addition",
          "subtraction"
        ],
        "teacher": "id",
        "level": 2
      }
    ],
    "state": "ongoing",
    "messages": [
      [
        {
          "id": "message1id",
          "message": "textMessage1",
          "from": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "0000000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "timestamp": "1603911873563"
        },
        {
          "id": "message2id",
          "message": "textMessage2",
          "from": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "0000000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "timestamp": "1603911873517"
        },
        {
          "id": "message3id",
          "message": "textMessage3",
          "from": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "00000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "00000000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "timestamp": "1603911873541"
        }
      ]
    ],
    "meetings": [
      {}
    ]
  }

  exampleProject2 = {
    "id": "projectId2",
    "classes": [
      {
        "id": "5f8c63862d6a720016449f23",
        "name": "Class 1",
        "language": "en",
        "country": "DE",
        "projectDuration": 10,
        "meetingFrequency": 2,
        "languageLevel": "A1",
        "subject": "mathematics",
        "topics": [
          "addition",
          "subtraction"
        ],
        "teacher": "id",
        "level": 2
      },
      {
        "id": "class2id",
        "name": "Class 2",
        "language": "en",
        "country": "DE",
        "projectDuration": 10,
        "meetingFrequency": 2,
        "languageLevel": "A1",
        "subject": "mathematics",
        "topics": [
          "addition",
          "subtraction"
        ],
        "teacher": "id",
        "level": 2
      }
    ],
    "state": "pending",
    "messages": [
      [
        {
          "id": "message1id",
          "message": "textMessage1",
          "from": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "00000000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "timestamp": "1603911873563"
        },
        {
          "id": "message2id",
          "message": "textMessage2",
          "from": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "00000000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "timestamp": "1603911873517"
        },
        {
          "id": "message3id",
          "message": "textMessage3",
          "from": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
​            "firstName": "Peter",         ​
            "id": "00000000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "timestamp": "1603911873541"
        }
      ]
    ],
    "meetings": [
      {}
    ]
  }


  ngOnInit() {
      this.requestInfoForm = this.fb.group({

      });
      this.loading = true;

      this.userService.getMe().pipe(first()).subscribe({
          next: (response) => {
            // this.loading = false;
            this.user = response;
            this._snackBar.open('Welcome to your partner classes page!', 'Close', {
              duration: 3000
            });
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            this._snackBar.open(this.error, 'Close', {
              duration: 3000
            });
          },
        })
      
      this.classService.classesGet().subscribe({
        next: (response) => {
          // this.loading = false;
          this.user_classes = response;
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
          duration: 3000
          });
          this.loading = false;
        },
      });

      this.classService.classesGet().pipe(
        map( (classes) =>
          classes.map( 
            (cls) => this.projectService.classesClassIdProjectsGet(cls.id).subscribe(result => {
              let clsProjects = [];
              for (let project of result){
                let partnerClass = {};
                let modProject = project;
                
                for (let p of project.classes){
                  if (p.id != cls.id){
                    partnerClass = p;
                  }  
                }
                
                modProject["partnerClass"] = partnerClass;
                clsProjects.push(modProject);
              }
              this.user_projects.push({"class": cls, "projects": clsProjects});
              // for (let p of this.exampleProject1.classes){
              //   if (p.id != cls.id){
              //     partnerClass = p;
              //   }
              // }
              // this.exampleProject1["partnerClass"] = partnerClass;
              // this.exampleProject2["partnerClass"] = partnerClass;
              // if (cls.name == "Class 1"){
              //   this.user_projects.push({"class": cls, "projects": [this.exampleProject1, this.exampleProject2]}); //TODO: replace with result});
              // }
              // else if (cls.name == "Class 2"){
              //   this.user_projects.push({"class": cls, "projects": []});
              // }
              // else{
              //   this.user_projects.push({"class": cls, "projects": [this.exampleProject2]}); //TODO: replace with result});
              // }
              // return result;
              })
            )
          )
          ).subscribe({
              next: (response) => {
                this.loading = false;
                this.allDataLoaded = true;
                console.log("all Projects:");
                console.log(this.user_projects) 
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

  detailsFor(cls, prjct){
    this.actClass = cls;
    this.actProject = prjct;
  }
  
}
