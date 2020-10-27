import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.less']
})
export class DashboardContentComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateTo(pageName: string) {
    switch (pageName) {
      case "classPage": {
        this.router.navigate(['/class-information']);
        break
      }
      case "myConnectionRequestsPage": {
        this.router.navigate(['/my-connection-requests']);
        break
      }
      case "planMeetingPage": {
        this.router.navigate(['/plan-meeting']);
        break
      }
      case "findPartnerClassPage": {
        this.router.navigate(['/find-partner-class']);
        break
      }
    }
  }

}
