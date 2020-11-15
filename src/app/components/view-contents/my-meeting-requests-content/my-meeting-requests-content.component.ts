import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeetingsService } from '@app/services/swagger-api/meetings.service';
import { ClassesService } from '@app/services/swagger-api/classes.service';
import { ProjectsService } from '@app/services/swagger-api/projects.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskList } from '@app/models/game-models/task-list';
import { Alias } from '@app/models/game-models/alias';
import { Quiz } from '@app/models/game-models/quiz';
import { DrawIt } from '@app/models/game-models/drawIt';
import { SimpleTask } from '@app/models/game-models/simpleTask';

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
  meetingList: any;
  loading = false;
  sendingPutRequest = false;
  user_classes = [];
  error = '';
  isMeetingListEmpty = false;
  additionalColumn = [];
  isAdditionalColumnMyStudent = false;
  selectedMeetingObject: any;

  myStudentsList = [];

  partnerStudentsList = [];
  displayAdditionalColumn = false;

  // for task list
  public selectedAliases: Alias[] = [];
  public selectedQuizzes: Quiz[] = [];
  public selectedDrawIts: DrawIt[] = [];
  public simpleTasks: SimpleTask[] = [];
  typeOfTasks = ['Quiz', 'Alias', 'Draw-It', 'Simple Task'];
  selectedTypeOfTask = '';
  currentMeetingId: any;
  // end of task list attributes
 
  constructor(
    private fb: FormBuilder, 
    private projectService: ProjectsService,
    private meetingService: MeetingsService,
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
    this.projectList = [];
    this.meetingList = [];

    this.isProjectSelected = false;

    this.projectService.classesClassIdProjectsGet(this.selectedClass.id).subscribe({
      next: (response) => {
        this.projectList = response;
        for (let entry of this.projectList) {
          entry['classname'] = entry['classes'][1]['name']

          if(entry['classes'][1]['teacher']['schoolName'] ) {
            entry['schoolName'] = entry['classes'][1]['teacher']['schoolName'] 
          } else {
            entry['schoolName'] = entry['startedBy']['schoolName'] 
          }
        }
        console.log(this.projectList)
      }
    });
  }  

  projectSelected(){
    this.selectedProject = this.projectSelectForm.value.selectedProject;
    this.isProjectSelected = true;
    this.fetchMeetings();
  }  

  fetchMeetings() {
    const classID = this.selectedClass.id
    const projectID = this.selectedProject.id

    this.meetingService.classesClassIdProjectsProjectIdMeetingsGet(classID, projectID).subscribe({
      next: (response) => {
        this.meetingList = response;

        if(this.meetingList.length === 0) {
          this.isMeetingListEmpty = true;
        } else {
          this.isMeetingListEmpty = false;
        }
        this.loading = false;
        console.log(this.meetingList)
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


  drop(event: CdkDragDrop<string[]>, list) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }

  saveArrangement() {
    //Formating of Groups
    let transposedArray = this.transpose([this.myStudentsList, this.partnerStudentsList, this.additionalColumn]) 

    let newArray = []
    for (let array of transposedArray ) {
      var qwer = array.filter(function(v){return v !==''});
      newArray.push(qwer)
    }

    for(let groupIndex in this.selectedMeetingObject.groups) {
      for(let updatedGroupIndex in newArray) {
        if(groupIndex == updatedGroupIndex) {
          this.selectedMeetingObject.groups[groupIndex]['participants'] = newArray[updatedGroupIndex]
        }

      }
    }

    console.log(this.selectedClass.id)
    console.log(this.selectedProject.id)
    console.log(this.selectedMeetingObject.id)

    console.log(this.selectedMeetingObject)

    this.sendingPutRequest = true;

    

    //Send PUT request
    this.meetingService.classesClassIdProjectsProjectIdMeetingsMeetingIdPut(this.selectedMeetingObject, 
      this.selectedClass.id, 
      this.selectedProject.id, 
      this.selectedMeetingObject.id).subscribe({
        next: (response) => {
          console.log(response);
          this._snackBar.open('Group Arrangement Saved Succesfully', 'Close', {
            duration: 3000,
          });
          this.sendingPutRequest = false;
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
          duration: 3000
          });
          this.loading = false;
        },
      })

    //Clear temp Arrays
    // this.resetTempValues()


  }

  /**
     * Swornim is doing his magic 
     * delete task with id=taskId from meeting with id=this.currentMeetingId
     * */
    // TODO: PUT request to BE (DONE), fix bug related to sending PUT request

  deleteTask(taskObj, type: string){
    console.log(taskObj);
    console.log(type);
    console.log(this.selectedMeetingObject.taskList[type]);

    var index = this.selectedMeetingObject.taskList[type].indexOf(taskObj);
    if (index !== -1) {
      this.selectedMeetingObject.taskList[type].splice(index, 1);
    }

    console.log(this.selectedMeetingObject)


    // TODO: Send the PUT Request to Backend here
    this.meetingService.classesClassIdProjectsProjectIdMeetingsMeetingIdPut(this.selectedMeetingObject, 
      this.selectedClass.id, 
      this.selectedProject.id, 
      this.selectedMeetingObject.id).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
          duration: 3000
          });
          this.loading = false;
        },
      })
  }

  deleteMeeting(meetingId) {
    this.meetingService
    .classesClassIdProjectsProjectIdMeetingsMeetingIdDelete(this.selectedClass.id, this.selectedProject.id, meetingId)
    .subscribe({
      next: (response) => {
        let index = this.meetingList.find(element => element.id === response.id);
        this.meetingList.splice(index, 1);

        if(this.meetingList.length === 0) {
          this.isMeetingListEmpty = true;
        }
        this._snackBar.open('Meeting Deleted Successfully!', 'Close', {
          duration: 3000,
        });
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

  stringFormatter(text: string) {
    return text.toLowerCase();
  }

  typeSelected(event) {
    let type = this.stringFormatter(event.target.value);

    switch (type) {
      case "quiz": {
        this.selectedTypeOfTask = 'quiz'
        break
      }
      case "alias": {
        this.selectedTypeOfTask = 'alias'
        break
      }
      case "draw-it": {
        this.selectedTypeOfTask = 'draw-it'
        break
      }
      case "2 truths 1 lie": {
        this.selectedTypeOfTask = '2t1l'
        break
      }
      default: {
        this.selectedTypeOfTask = 'simple-task'
        break
      }
    }
  }
  loadTaskList(meetingObj){
    this.selectedMeetingObject = meetingObj
    
    this.currentMeetingId = meetingObj.id;
    if(this.meetingList) {
      const currList = this.meetingList.find(x => x.id == this.currentMeetingId).taskList;
      if(currList){
        this.selectedAliases = currList.aliases;
        this.selectedQuizzes = currList.quizzes;
        this.selectedDrawIts = currList.drawits;
        this.simpleTasks = currList.simpleTasks;
      }
    }
  }

  loadGroupArrangement(meetingObj) {
    this.selectedMeetingObject = meetingObj;
    console.log(meetingObj)
    let groups = meetingObj.groups;
    console.log(groups)

    for(let index in groups) {
      // console.log(groups[index]['participants'])
      if (groups[index]['participants'].length == 2) {
        for (let participantIndex in groups[index]['participants']) {
          if(Number(participantIndex) % 2 == 0) {
            this.myStudentsList.push(groups[index]['participants'][participantIndex])
          } else {
            this.partnerStudentsList.push(groups[index]['participants'][participantIndex])
          }
        }
        this.additionalColumn.push('');
      }
    }

    for(let index in groups) {
      // console.log(groups[index]['participants'])
      if (groups[index]['participants'].length !== 2) {
        this.displayAdditionalColumn = true;

        for (let participantIndex in groups[index]['participants']) {
          if(Number(participantIndex) == 0) {
            this.myStudentsList.push(groups[index]['participants'][participantIndex])
          } else if (Number(participantIndex) == 1){
            this.partnerStudentsList.push(groups[index]['participants'][participantIndex])
          } else {
            this.additionalColumn.push(groups[index]['participants'][participantIndex])
          }
        }
      }
    }



  }

  transpose = matrix => matrix.reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), [])

  resetTempValues() {
    console.log('Closing Modal');
    this.selectedMeetingObject = [];
    this.myStudentsList = []
    this.partnerStudentsList = []
    this.additionalColumn = [];
    this.isAdditionalColumnMyStudent = false;
    this.displayAdditionalColumn = false
  }

}
