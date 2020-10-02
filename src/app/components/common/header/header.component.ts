import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomLoginService } from '@app/services/custom';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private loginService : CustomLoginService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: '',
    });
  }

  // TODO: Implement Search function here
  search() {}

  logout(){
    this.loginService.logout();
  }

}
