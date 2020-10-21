import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators, ValidatorFn } from '@angular/forms'
import { Alias } from '@app/models/game-models/alias';

@Component({
  selector: 'app-alias-form',
  templateUrl: './alias-form.component.html',
  styleUrls: ['./alias-form.component.less']
})
export class AliasFormComponent implements OnInit {

  @Input() game: Alias;
  @Output() gameChange: EventEmitter<Alias> = new EventEmitter<Alias>();

  alias = this.fb.group({
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
    return this.alias.get('words') as FormArray;
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
    let updated = this.alias.value;
    updated._id = this.game._id;
    this.gameChange.emit(updated);
  }

  reset() {
    this.alias.reset();
  }

  updateGame(update: Alias) {
    this.alias.patchValue({
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

