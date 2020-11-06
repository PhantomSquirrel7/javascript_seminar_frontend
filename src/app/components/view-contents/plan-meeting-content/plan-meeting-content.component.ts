import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/swagger-api/classes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProjectsService } from '@app/services/swagger-api/projects.service';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { MessageService } from '@app/services/custom/messages/message.service';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from '@app/models/game-models/quiz';
import { Question } from '@app/models/game-models/question';
import { SimpleTask } from '@app/models/game-models/simpleTask';
import { Alias } from '@app/models/game-models/alias';
import { DrawIt } from '@app/models/game-models/drawIt';


@Component({
  selector: 'app-plan-meeting-content',
  templateUrl: './plan-meeting-content.component.html',
  styleUrls: ['./plan-meeting-content.component.less']
})
export class PlanMeetingContentComponent implements OnInit {
  projectList = [];
  list1 = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith'
  ];

  list2 = [
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - The Empire Strikes Back'
  ];

  quizzes: Quiz[];
  questions: Question[];
  aliasGames: Alias[];
  drawGames : DrawIt[];
  
  newTask: SimpleTask = {
    _id: "-1",
    name: "",
    description: ""
  };
  
  // Dummy Project assigned to Class. TODO: Fetch it from backend
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
            "firstName": "Peter",
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
            "firstName": "Peter",
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
            "firstName": "Peter",
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
            "firstName": "Peter",
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
            "firstName": "Peter",
            "id": "00000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
            "firstName": "Peter",
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
    "state": "ongoing",
    "messages": [
      [
        {
          "id": "message1id",
          "message": "textMessage1",
          "from": {
            "email": "test@mail.de",
            "firstName": "Peter",
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
            "firstName": "Peter",
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
            "firstName": "Peter",
            "id": "5f685056d6bf4e0016d9931e",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
            "firstName": "Peter",
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
            "firstName": "Peter",
            "id": "00000",
            "lastName": "Tester",
            "role": "teacher",
            "schoolName": "test school"
          },
          "to": {
            "email": "test@mail.de",
            "firstName": "Peter",
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

  //projectList = [this.exampleProject1, this.exampleProject2];

  clsSelecForm: FormGroup;
  projectSelectForm: FormGroup;
  planningSectionForm: FormGroup;

  user: User;
  error = '';
  isClassSelected = false;
  selectedClass: any; // Type Class
  selectedTypeOfClass = ''
  selectedDuration: number;
  durations = [30, 45, 60, 90, 120];
  date: Date;
  typeOfClasses = ['Quiz', 'Ice-Breaker Game', 'Others',]
  loading = false;
  selectedArrangement = '';
  selectedProject: any; // Type Project
  isProjectSelected = false;

  user_classes = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ClassesService,
    private projectService: ProjectsService,
    private _snackBar: MatSnackBar,
    private api: GamesApiService,
    private messageService: MessageService,
    public deleteDialog: MatDialog
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
      selectedDuration: [null]
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
    this.api.getQuizzes().subscribe(data => {
      this.quizzes = data;
    });
    this.api.getQuestions().subscribe(data => {
      this.questions = data;
    });
    this.api.getAliasGames().subscribe(data => {
      this.aliasGames = data;
    });
    this.api.getDrawItGames().subscribe(data => {
      this.drawGames = data;
    });
  }

  onQuestionChange(question: Question) {
    this.api.updateQuestion(question).subscribe(data => {
      if (data) {
        //console.log("changed question", data)
        this.questions[this.questions.findIndex(g => {
          return g.id === question.id
        })] = data;
        this.messageService.add("Question '" + question.name + "' updated successfully.", "success");
      }
    });
  }

  onQuizChange(quiz: Quiz) {
    this.api.updateQuiz(quiz).subscribe(data => {
      if (data) {
        //console.log("changed quiz", data)
        this.quizzes[this.quizzes.findIndex(g => {
          return g.id === quiz.id
        })] = data;
        this.messageService.add("Quiz '" + quiz.name + "' updated successfully.", "success");
      }
    });
  }

  onGameChange(game: Alias) {
    this.api.updateAliasGame(game).subscribe(data => {
      if (data) {
        //console.log("changed game", data)
        this.aliasGames[this.aliasGames.findIndex(g => {
          return g.id === data.id
        })] = data;
        this.messageService.add("Game '" + game.name + "' updated successfully.", "success");
      }
    });
  }

  onCreateQuestion(question: Question) {
    this.api.createQuestion(question).subscribe(data => {
      if (data) {
        this.questions = [...this.questions, data];
        this.resetNewTask();
        this.messageService.add("New Question created: " + question.name, "success");
      }
    });
  }

  // TODO onCreateTask

  resetNewTask() {
    this.newTask = {
      _id: "-1",
      name: "",
      description: ""
    }
  }

  classSelected() {
    this.selectedClass = this.clsSelecForm.value.selectedClass;
    this.isClassSelected = true;
    this.isProjectSelected = false;
    console.log('teacher:' + this.selectedClass.id)

    this.projectService.classesClassIdProjectsGet(this.selectedClass.id).subscribe({
      next: (response) => {
        this.projectList = response;
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
        this.selectedTypeOfClass = 'quiz'
        break
      }
      case "ice-breaker game": {
        this.selectedTypeOfClass = 'ice-breaker'
        break
      }
      default: {
        this.selectedTypeOfClass = 'other'
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
    console.log(this.date);
    console.log(this.selectedDuration);
    console.log(this.selectedArrangement)
    console.log(this.selectedProject.id);
  }

  onDateSelected(event) {
    this.date = event.value;
  }

  durationSelected() {
    this.selectedDuration = this.planningSectionForm.value.selectedDuration;
  }
}
