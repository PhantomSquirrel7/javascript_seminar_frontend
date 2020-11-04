import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';

@Component({
  selector: 'app-games-teacher-view',
  templateUrl: './games-teacher-view.component.html',
  styleUrls: ['./games-teacher-view.component.less']
})
export class GamesTeacherViewComponent implements OnInit {
  loading = false;
  error = '';
  user: User;

  constructor() { }

  ngOnInit() {
    
  }

}
