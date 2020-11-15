import { Component, OnInit } from '@angular/core';
import { Body9, User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/swagger-api/classes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from '@app/services/swagger-api/projects.service';
import { Quiz } from '@app/models/game-models/quiz';
import { Alias } from '@app/models/game-models/alias';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { TaskList } from '@app/models/game-models/task-list';
import { DrawIt } from '@app/models/game-models/drawIt';
import { SimpleTask } from '@app/models/game-models/simpleTask';
import { MeetingsService } from '@app/services/swagger-api/meetings.service';


@Component({
  selector: 'app-plan-meeting-content',
  templateUrl: './plan-meeting-content.component.html',
  styleUrls: ['./plan-meeting-content.component.less']
})
export class PlanMeetingContentComponent implements OnInit {
  // for task list
  taskList: TaskList = { //initialize taskList in body above with this
    // id: "-1",
    quizzes: [],
    aliases: [],
    drawits: [],
    simpleTasks: []
  };
  aliases: Alias[];
  quizzes: Quiz[];
  drawIts: DrawIt[];
  public selectedAliases: Alias[] = [];
  public selectedQuizzes: Quiz[] = [];
  public selectedDrawIts: DrawIt[] = [];
  public simpleTasks: SimpleTask[] = [];
  // end of task list attributes

  projectList = [];

  clsSelecForm: FormGroup;
  projectSelectForm: FormGroup;
  planningSectionForm: FormGroup;

  timeValue = '';
  user: User;
  error = '';
  isClassSelected = false;
  selectedClass: any; // Type Class
  selectedTypeOfTask = ''
  selectedDuration: number;
  durations = [30, 45, 60, 90, 120];
  date: Date;
  typeOfTasks = ['Quiz', 'Alias', 'Draw-It', 'Simple Task']; //TODO add '2 Truths 1 Lie'
  loading = false;
  selectedArrangement = '';
  selectedProject: any; // Type Project
  isProjectSelected = false;
  submittingFormLoader = false;

  user_classes = [];
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ClassesService,
    private projectService: ProjectsService,
    private _snackBar: MatSnackBar,
    private api: GamesApiService,
    private meetingService: MeetingsService,
  ) { }

  ngOnInit() {
    this.selectedArrangement = 'tandem';
    this.clsSelecForm = this.fb.group({
      selectedClass: [null]
    });
    this.projectSelectForm = this.fb.group({
      selectedProject: [null]
    });
    this.planningSectionForm = this.fb.group({
      selectedDuration: [null],
      selectedTime: [null]
    });
    this.classService.classesGet().subscribe({
      next: (response) => {
        this.loading = false;
        this.user_classes = response;
        console.log(this.user_classes[0]);
      },
      error: (error) => {
        this.error = error;
        this._snackBar.open(this.error, 'Close', {
          duration: 3000
        });
        this.loading = false;
      },
    });
    this.api.getAliasGames().subscribe(data => {
      this.aliases = data;
    });
    this.api.getQuizzes().subscribe(data => {
      this.quizzes = data;
    });
    this.api.getDrawItGames().subscribe(data => {
      this.drawIts = data;
    });
    this.minDate = new Date();
  }

  classSelected() {
    this.projectList = []
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isClassSelected = true;
    this.isProjectSelected = false;
    console.log('teacher:' + this.selectedClass.id)

    this.projectService.classesClassIdProjectsGet(this.selectedClass.id).subscribe({
      next: (response) => {
        this.projectList = response;

        for (let entry of this.projectList) {
          entry['classname'] = entry['classes'][1]['name']

          if (entry['classes'][1]['teacher']['schoolName']) {
            entry['schoolName'] = entry['classes'][1]['teacher']['schoolName']
          } else {
            entry['schoolName'] = entry['startedBy']['schoolName']
          }
        }

        console.log(this.projectList)
      }
    });


  }

  projectSelected() {
    this.selectedProject = this.projectSelectForm.value.selectedProject;
    this.isProjectSelected = true;
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

  stringFormatter(text: string) {
    return text.toLowerCase();
  }

  selectArrangement(arrangement: string) {
    this.selectedArrangement = arrangement;
  }

  submitForm() {
    // FORM VALIDATION
    if (!this.date || !this.selectedDuration || !this.planningSectionForm.value.selectedTime) {
      this._snackBar.open('All Fields of Form must be filled', 'Close', {
        duration: 3000
      });
    } else {
      this.submittingFormLoader = true;

      console.log(this.date.toLocaleDateString('en-CA'));
      console.log(this.selectedDuration);
      console.log(this.selectedArrangement)
      console.log(this.selectedProject.id);
      this.timeValue = this.planningSectionForm.value.selectedTime;

      // Format date / time
      let postDate = this.date;
      let timeSplit = this.timeValue.split(":")
      let epochTime = postDate.setHours(Number(timeSplit[0]), Number(timeSplit[1]))
      postDate = new Date(epochTime)
      console.log(postDate)

      // Task List
      this.taskList.quizzes = this.getIDs(this.selectedQuizzes);
      this.taskList.aliases = this.getIDs(this.selectedAliases);
      this.taskList.drawits = this.getIDs(this.selectedDrawIts);
      this.taskList.simpleTasks = this.simpleTasks;

      let myBody: Body9 = {
        "date": postDate,
        "duration": this.selectedDuration,
        "taskList": this.taskList,
        "groupAssignment": this.getGroupAssignment(),
      };

      console.log(myBody.taskList)

      // Send POST REQUEST
      this.meetingService.classesClassIdProjectsProjectIdMeetingsPost(myBody,
        this.selectedClass.id,
        this.selectedProject.id,
      ).subscribe(
        data => {
          this._snackBar.open('Meeting created Successfully', 'Close', {
            duration: 3000
          });
          console.log(data);
          this.submittingFormLoader = false;

        }
      );
    }
  }

  onDateSelected(event) {
    this.date = event.value;
  }

  durationSelected() {
    this.selectedDuration = this.planningSectionForm.value.selectedDuration;
  }

  getGroupAssignment(): Body9.GroupAssignmentEnum {
    if (this.selectedArrangement == 'tandem') {
      return Body9.GroupAssignmentEnum.Tandem
    } else {
      return Body9.GroupAssignmentEnum.WholeClass
    }
  }

  getIDs(games) {
    return games.map(game => game.id);
  }
}
