import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Question } from '@app/models/game-models/question';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.less']
})

export class QuestionFormComponent implements OnInit {

  @Input() quest: Question;
  @Output() questionChange: EventEmitter<Question> = new EventEmitter<Question>();

  types = ['select', 'match'];

  question = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    question: ['', Validators.required],
    options: this.fb.array([], Validators.required),
    answer: this.fb.array([]) // TODO required
  });

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['quest']) {
      this.updateQuestion(changes.quest.currentValue);
    }
  }

  ngOnInit(): void {
  }

  addOption(option = '') {
    this.options.push(this.fb.control(option));
  }

  addOptionPair() {
    this.addOption();
    this.addOption();
  }

  addAnswer(answer) {
    this.answer.push(this.fb.control(answer));
  }

  deleteOptionPair(index) {
    this.options.removeAt(index);
    this.options.removeAt(index);
    if (this.options.length == 0) {
      this.addOptionPair();
    }
  }

  deleteOption(index) {
    this.options.removeAt(index);
  }

  get options() {
    return this.question.get('options') as FormArray;
  }

  get answer() {
    return this.question.get('answer') as FormArray;
  }

  get type() {
    return this.question.get('type').value;
  }

  isAnswer(index) {
    return this.answer.value.includes(index);
  }

  onAnswerChange(event: MatSlideToggleChange, index) {
    console.log(event)
    // TODO 
    // !! fix index problem when deleting an option
    if (event.checked) {
      this.addAnswer(index);
    } else {
      let i = 0;
      while (i < this.answer.length) {
        if (this.answer.at(i).value == index) {
          this.answer.removeAt(i)
        } else i++;
      }
    }
    console.log(this.answer.value)
  }

  onTypeChange(event: MatSelectChange) {
    this.options.clear();
    if (event.value == "select") {
      this.addOption();
    } else this.addOptionPair();
  }

  onSubmit() {
    if (this.type == "match") {
      for (let index = 0; index < this.options.length; index = index + 2) {
        this.addAnswer([index, index + 1]);
      }
    }
    let updated = this.question.value;
    updated._id = this.quest._id;
    this.questionChange.emit(updated);
  }

  updateQuestion(update: Question) {
    this.question.patchValue({
      type: update.type,
      name: update.name,
      question: update.question
    })
    this.options.clear();
    update.options.forEach(option => {
      this.addOption(option)
    });
    if (this.options.length == 0) {
      if (update.type == "match") {
        this.addOptionPair()
      } else
        this.addOption();
    }
    this.answer.clear();
    update.answer.forEach(answ => {
      this.addAnswer(answ)
    });
  }
}
