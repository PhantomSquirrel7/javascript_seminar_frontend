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
  base_projects: any[] = [];


  actClass: any = {};
  actProject: any = {};
  exchangeTeacher: any = {};


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
              // Sorting of the projects
              this.user_projects = this.user_projects.sort( (a, b) => {
                var clsNameA = a.class.name.toLowerCase();
                var clsNameB = b.class.name.toLowerCase();
                if (clsNameA < clsNameB){
                  return -1
                }
                else if (clsNameA > clsNameB){
                  return 1
                }
                else{
                 return 0 
                }  
              });
              this.base_projects = [].concat(this.user_projects);
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

  filterByCreator(creator){
    var tmp = [].concat(this.base_projects);
    console.log("TMP:");
    console.log(tmp);
    for (let clsProj of tmp){
      clsProj.projects = clsProj.projects.filter( singleProj =>{
        if (singleProj.startedBy != undefined){
          if (creator == "me"){
            return singleProj.startedBy.id == this.user.id;
          }
          else if (creator == "other"){
            return singleProj.startedBy.id != this.user.id;
          }
          else {
            return singleProj;
          }
        }
        else{
          if (creator == "me"){
            return singleProj.partnerClass.id == clsProj.class.id;
          }
          else if (creator == "other"){
            return singleProj.partnerClass.id != clsProj.class.id;
          }
          else {
            return singleProj;
          }
        }
      });
    };
    this.user_projects = [...tmp];
    console.log("filtered: ");
    console.log(tmp);
  }
  
}
