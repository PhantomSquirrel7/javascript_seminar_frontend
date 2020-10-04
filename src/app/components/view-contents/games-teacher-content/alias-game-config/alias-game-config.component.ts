import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alias-game-config',
  templateUrl: './alias-game-config.component.html',
  styleUrls: ['./alias-game-config.component.less']
})
export class AliasGameConfigComponent implements OnInit {
  games = [
    { name: "Class 6b", words: ["space", "force", "chemistry"]},
    { name: "Class 7a", words: ["stars", "rocket", "gravity"], description: "words about space" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addGame(){
    console.log("add alias game")
  }
}
