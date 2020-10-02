import { Component, OnInit } from '@angular/core';
import { CustomLoginService } from '@app/services/custom';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
  constructor(private customLoginService: CustomLoginService) {}

  ngOnInit(): void {}

  logout() {
    this.customLoginService.logout();
  }
}
