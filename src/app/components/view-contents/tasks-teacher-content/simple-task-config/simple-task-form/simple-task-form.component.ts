import { SimpleTask } from '@app/models/game-models/simpleTask';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Question } from '@app/models/game-models/question';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-simple-task-form',
  templateUrl: './simple-task-form.component.html',
  styleUrls: ['./simple-task-form.component.less']
})
export class SimpleTaskFormComponent implements OnInit {

  @Input() simpleTask: SimpleTask;
  @Output() taskChange: EventEmitter<SimpleTask> = new EventEmitter<SimpleTask>();

  /*task = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  
  constructor(private fb: FormBuilder) { }*/
  task: SimpleTask = {
    _id: "-1",
    name: "",
    description: ""
  };
  constructor(){}

  ngOnInit(): void {
  }
}
