import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ClassesService,
  ProjectsService,
  UserService,
} from '@app/services/swagger-api/api';
import { CustomLoginService } from '@app/services/custom/login/login.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.less'],
})
export class DashboardContentComponent implements OnInit {
  numClass = 0;
  numMeeting = 0;
  numProject = 0;
  numRequest = 0;

  constructor(
    private router: Router,
    private classService: ClassesService,
    private user2Service: UserService,
    private projectService: ProjectsService,
    public loginService: CustomLoginService
  ) {}

  ngOnInit(): void {
    this.retrieveMetadata();
    this.getMeetingCount();
    this.getProjectsCount();
    this.getRequestCount();
    this.getProjectRequestsCount();
  }
  getRequestCount() {}

  retrieveMetadata(): void {
    this.getClassCount();
  }

  getClassCount() {
    this.classService
      .classesGet()
      .toPromise()
      .then((response) => {
        this.numClass = response.length ? response.length : 0;
      });
  }

  getMeetingCount() {
    this.user2Service
      .meMeetingsGet()
      .toPromise()
      .then((response) => {
        this.numMeeting = response.length ? response.length : 0;
      });
  }

  getProjectsCount() {
    this.classService
      .classesGet()
      .toPromise()
      .then((response) => {
        response.forEach((cls) => {
          this.projectService
            .classesClassIdProjectsGet(cls.id)
            .subscribe((response) => {
              this.numProject = response.length
                ? this.numProject + response.length
                : this.numProject;
            });
        });
      });
  }

  getProjectRequestsCount(){
    this.classService
      .classesGet()
      .toPromise()
      .then( (classes) => {
        classes.forEach( (cls) => {
          this.projectService
            .classesClassIdProjectsGet(cls.id)
            .subscribe((response) => {
              if (response.length){
                response.forEach( (prjct) => {
                  if (prjct.startedBy.id != this.loginService.userValue.id && prjct.state == "pending"){
                    this.numRequest = this.numRequest + 1;
                  }
                });
              }
              else{
                this.numRequest = this.numRequest;
              }
            });
          });
        });
    }
}
