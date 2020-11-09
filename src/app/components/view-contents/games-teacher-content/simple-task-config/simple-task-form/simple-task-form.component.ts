import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators, ValidatorFn } from '@angular/forms'
import { SimpleTask } from '@app/models/game-models/simpleTask';

@Component({
  selector: 'app-simple-task-form',
  templateUrl: './simple-task-form.component.html',
  styleUrls: ['./simple-task-form.component.less']
})
export class SimpleTaskFormComponent implements OnInit {

  @Input() game: SimpleTask;
  @Output() gameChange: EventEmitter<SimpleTask> = new EventEmitter<SimpleTask>();

  simpletask = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  })
  
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['game']) {
      this.updateGame(changes.game.currentValue);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let updated = this.simpletask.value;
    updated.id = this.game.id;
    this.gameChange.emit(updated);
  }

  reset() {
    this.simpletask.reset();
  }

  updateGame(update: SimpleTask) {
    this.simpletask.patchValue({
      name: update.name,
      description: update.description
    })
  }

}
