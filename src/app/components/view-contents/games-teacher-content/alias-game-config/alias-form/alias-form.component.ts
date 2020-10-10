import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms'
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
    name: [''],
    description: [''],
    words: this.fb.array([
    ])
  })

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.alias.patchValue({
      name: this.game.name,
      description: this.game.description,
    })
    this.game.words.forEach(word => {
      this.addWord(word)
    });
    if (this.game.words.length == 0) {
      this.addWord();
    }
  }

  addWord(word = '') {
    this.words.push(this.fb.control(word));
  }

  get words() {
    return this.alias.get('words') as FormArray;
  }

  deleteWord(index) {
    this.words.removeAt(index);
    if(this.words.length == 0){
      this.addWord();
    }
  }

  onSubmit() {
    let updated = this.alias.value;
    updated.id = this.game.id;
    this.gameChange.emit(updated);
  }

  reset() {
    this.alias.reset();
  }
}
