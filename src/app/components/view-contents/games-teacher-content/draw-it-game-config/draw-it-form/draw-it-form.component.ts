import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms'
import { DrawIt } from '@app/models/game-models/drawIt';

@Component({
  selector: 'app-draw-it-form',
  templateUrl: './draw-it-form.component.html',
  styleUrls: ['./draw-it-form.component.less']
})
export class DrawItFormComponent implements OnInit {

  @Input() game: DrawIt;
  @Output() gameChange: EventEmitter<DrawIt> = new EventEmitter<DrawIt>();

  drawit = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    words: this.fb.array([
    ], invalidWordsValidator)
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['game']) {
      this.updateGame(changes.game.currentValue);
    }
  }

  ngOnInit(): void {
  }

  addWord(word = '') {
    this.words.push(this.fb.control(word));
  }

  get words() {
    return this.drawit.get('words') as FormArray;
  }

  deleteWord(index) {
    this.words.removeAt(index);
    if (this.words.length == 0) {
      this.addWord();
    }
  }

  onSubmit() {
    let index = 0;
    while (index < this.words.length) {
      if (this.words.at(index).value == "") {
        this.deleteWord(index);
      } else {
        index++;
      }
    }
    let updated = this.drawit.value;
    updated._id = this.game._id;
    this.gameChange.emit(updated);
  }

  reset() {
    this.drawit.reset();
  }

  updateGame(update: DrawIt) {
    this.drawit.patchValue({
      name: update.name,
      description: update.description
    })
    this.words.clear();
    update.words.forEach(word => {
      this.addWord(word)
    });
    if (this.words.length == 0) {
      this.addWord();
    }
  }
}

function invalidWordsValidator(arr: FormArray): { [key: string]: any } | null {
  const words: [] = arr.value;
  let filter = words.filter(word => word != "");
  if (words.length == 0 || filter.length == 0) {
    return { 'invalidWords': true }
  } else return null;
}

