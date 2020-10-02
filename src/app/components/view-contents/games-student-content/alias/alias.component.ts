import { Component, OnInit } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.css']
})
export class GamesAliasComponent implements OnInit {

  constructor(private gamesService : GamesService) { }

  ngOnInit(): void {
  }

}
