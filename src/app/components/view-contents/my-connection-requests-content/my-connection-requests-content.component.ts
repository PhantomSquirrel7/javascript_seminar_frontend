import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  ngOnInit() {
      this.requestInfoForm = this.fb.group({

      });
      this.loading = true;

      this.userService.getMe().pipe(first()).subscribe({
          next: (response) => {
            // this.loading = false;
            this.user = response;
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

  closeAndReload(){
    console.log("called close!");
    document.getElementById('modalCloseButton').click();
    document.getElementById('reloadProjectsBtn').click();
  }

  detailsFor(cls, prjct){
    this.actClass = cls;
    this.actProject = prjct;
  }

  filterByCreator(creator){
    this.user_projects = [];
      if (creator == "me"){
          this.loadMyProjects();
      }
      else if (creator == "other"){
          this.loadOtherProjects();
      }
      else {
          this.loadAllProjects();
      }
      return true;
  }


  filterByState(state){
    this.user_projects = [];
      if (state == "pending"){
          this.loadPendingProjects();
      }
      else if (state == "ongoing"){
          this.loadOngoingProjects();
      }
      else if (state == 'done'){
          this.loadDoneProjects();
      }
      else{
          this.loadAllProjects();
      }
      return true;
  }
  

  loadMyProjects(){
    this.classService.classesGet().pipe(
      map( (classes) =>
        classes.map( 
          (cls) => this.projectService.classesClassIdProjectsGet(cls.id).subscribe(result => { // result = list of projects for one class
            let clsProjects = [];
            for (let project of result){
              let partnerClass: any = {};
              let modProject = project;
              
              for (let p of project.classes){
                if (p.id != cls.id){
                  partnerClass = p;
                }  
              }
              if (project.startedBy != undefined){  // needed for possible errors on projects created before change in api
                if (project.startedBy.id == this.user.id){
                  modProject["partnerClass"] = partnerClass;
                  clsProjects.push(modProject);
                }
              }
              else{
                if (partnerClass.id == cls.id){
                    modProject["partnerClass"] = partnerClass;
                    clsProjects.push(modProject);
                }
              }
              
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


  loadOtherProjects(){
    this.classService.classesGet().pipe(
      map( (classes) =>
        classes.map( 
          (cls) => this.projectService.classesClassIdProjectsGet(cls.id).subscribe(result => { // result = list of projects for one class
            let clsProjects = [];
            for (let project of result){
              let partnerClass: any = {};
              let modProject = project;
              
              for (let p of project.classes){
                if (p.id != cls.id){
                  partnerClass = p;
                }  
              }

              if (project.startedBy != undefined){  // needed for possible errors on projects created before change in api
                if (project.startedBy.id != this.user.id){
                  modProject["partnerClass"] = partnerClass;
                  clsProjects.push(modProject);
                }
              }
              else{
                if (partnerClass.id != cls.id){
                    modProject["partnerClass"] = partnerClass;
                    clsProjects.push(modProject);
                }
              }             
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


  loadAllProjects(){
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


  loadPendingProjects(){
    this.classService.classesGet().pipe(
      map( (classes) =>
        classes.map( 
          (cls) => this.projectService.classesClassIdProjectsGet(cls.id).subscribe(result => { // result = list of projects for one class
            let clsProjects = [];
            for (let project of result){
              let partnerClass: any = {};
              let modProject = project;
              
              for (let p of project.classes){
                if (p.id != cls.id){
                  partnerClass = p;
                }  
              }
              if (project.state == 'pending'){
                modProject["partnerClass"] = partnerClass;
                clsProjects.push(modProject);
              }
              
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


  loadOngoingProjects(){
    this.classService.classesGet().pipe(
      map( (classes) =>
        classes.map( 
          (cls) => this.projectService.classesClassIdProjectsGet(cls.id).subscribe(result => { // result = list of projects for one class
            let clsProjects = [];
            for (let project of result){
              let partnerClass: any = {};
              let modProject = project;
              
              for (let p of project.classes){
                if (p.id != cls.id){
                  partnerClass = p;
                }  
              }
              if (project.state == 'ongoing'){
                modProject["partnerClass"] = partnerClass;
                clsProjects.push(modProject);
              }
              
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


  loadDoneProjects(){
    this.classService.classesGet().pipe(
      map( (classes) =>
        classes.map( 
          (cls) => this.projectService.classesClassIdProjectsGet(cls.id).subscribe(result => { // result = list of projects for one class
            let clsProjects = [];
            for (let project of result){
              let partnerClass: any = {};
              let modProject = project;
              
              for (let p of project.classes){
                if (p.id != cls.id){
                  partnerClass = p;
                }  
              }
              if (project.state == 'done'){
                modProject["partnerClass"] = partnerClass;
                clsProjects.push(modProject);
              }
              
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

}


