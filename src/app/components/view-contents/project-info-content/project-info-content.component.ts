import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { first, flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-project-info-content',
  templateUrl: './project-info-content.component.html',
  styleUrls: ['./project-info-content.component.less']
})
export class ProjectInfoContentComponent {

  @Input() actClass: any;
  @Input() actProject: any;
  @Input() me: any;
  @Input() closeAndReload: () => void;
  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private router: Router,
  ) { }

  projectForm: FormGroup;

  exchangeClass:any = {};

  accepted = false;
  btnAcceptable = false;

  deleted = false;
  btnDeletable = false;

  actSender:any = {};
  actRecipient:any = {};
  actMessages:any[] = [];

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      messageText: [""]
    });
    console.log("my project:");
    console.log(this.actProject);
    this.exchangeClass = this.actProject.partnerClass;
    this.actSender = this.me;
    this.actRecipient = this.actClass.teacher;
    this.actMessages = this.actProject.messages; 
  }

  acceptOffer(){
    this.accepted = true;
    this.btnAcceptable = true;
    console.log("accepting");
    // TODO: activate when working on backend-side
    this.projectsService.classesClassIdProjectsProjectIdAcceptInvitationPost(this.actClass.id, this.actProject.id).subscribe(
      (response) => {
        console.log(response);
        this.btnAcceptable = false;
        this.closeAndReload()
        const source = timer(1500);
        source.subscribe(data => {
          this.accepted=false
        });
      });
  }

  // reloadProject(){
  //   this.projectsService.classesClassIdProjectsProjectIdGet(this.actClass.id, this.actProject.id).pipe(
  //     map(prjct => {
  //       this.actProject = prjct;
  //     })
  //   );
  // }

  deleteProject(prjct){
    this.deleted = true;
    this.btnDeletable = true;

    this.projectsService.classesClassIdProjectsProjectIdDelete(this.actClass.id, prjct.id).subscribe(
      data => {
        this.btnDeletable = false;
        this.closeAndReload()
        const source = timer(1500);
        source.subscribe(data => {
          this.deleted=false
        });
      });
  }

}
