import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';

@Component({
  selector: 'app-games-student-view',
  templateUrl: './games-student-view.component.html',
  styleUrls: ['./games-student-view.component.less']
})
export class GamesStudentViewComponent implements OnInit {
  loading = false;
  error = '';
  user: User;

  constructor() { }

  ngOnInit() {
    
  }

}
