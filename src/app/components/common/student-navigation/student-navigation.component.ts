import { Component, OnInit } from '@angular/core';
import { CustomLoginService } from '@app/services/custom';

@Component({
  selector: 'app-student-navigation',
  templateUrl: './student-navigation.component.html',
  styleUrls: ['./student-navigation.component.less']
})
export class StudentNavigationComponent implements OnInit {

  constructor(private customLoginService: CustomLoginService) {}

  ngOnInit(): void {}

  logout() {
    this.customLoginService.logout();
  }
}
