import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassesService } from '@app/services/swagger-api/classes.service';
import { ProjectsService } from '@app/services/swagger-api/projects.service';

@Component({
  selector: 'app-my-meeting-requests-content',
  templateUrl: './my-meeting-requests-content.component.html',
  styleUrls: ['./my-meeting-requests-content.component.less']
})
export class MyMeetingRequestsContentComponent implements OnInit {
  projectSelectForm: FormGroup;
  selectedClass: any; // Type Class
  clsSelecForm: FormGroup;
  selectedProject: any; // Type Project
  isClassSelected = false;
  isProjectSelected = false;
  projectList = [];
  loading = false;
  user_classes = [];
  error = '';




 
  constructor(
    private fb: FormBuilder, 
    private projectService: ProjectsService,
    private classService: ClassesService,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void {
    this.clsSelecForm = this.fb.group({
      selectedClass: [null]
    });
    this.projectSelectForm = this.fb.group({
      selectedProject: [null]
    });
    this.classService.classesGet().subscribe({
      next: (response) => {
        this.loading = false;
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
  }

  classSelected(){
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isClassSelected = true;
    this.isProjectSelected = false;

    this.projectService.classesClassIdProjectsGet(this.selectedClass.id).subscribe({
      next: (response) => {
        this.projectList = response;
        console.log(this.projectList)
      }
    });
  }  

  projectSelected(){
    this.selectedProject = this.projectSelectForm.value.selectedProject;
    this.isProjectSelected = true;
  }  

}
