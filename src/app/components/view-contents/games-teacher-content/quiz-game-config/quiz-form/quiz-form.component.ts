import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Quiz } from '@app/models/game-models/quiz';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.less']
})

export class QuizFormComponent implements OnInit {

  @Input() game: Quiz;
  @Output() quizChange: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  quiz = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    questions: this.fb.array([])
  })

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['game']) {
      this.updateGame(changes.game.currentValue);
    }
  }

  ngOnInit(): void {
  }

  addQuestion(questionId = '') {
    this.questions.push(this.fb.control(questionId));
  }

  removeQuestion(index) {
    this.questions.removeAt(index);
    if (this.questions.length == 0) {
      this.addQuestion();
    }
  }

  get questions() {
    return this.quiz.get('questions') as FormArray;
  }

  onSubmit() {
    let updated = this.quiz.value;
    updated._id = this.game._id;
    this.quizChange.emit(updated);
  }

  updateGame(update: Quiz) {
    this.quiz.patchValue({
      name: update.name,
      description: update.description
    })
    this.questions.clear();
    update.questions.forEach(questionId => {
      this.addQuestion(questionId)
    });
    if (this.questions.length == 0) {
      this.addQuestion();
    }
  }
}
