import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { report } from 'process';

@Component({
  selector: 'app-display-partner-class-info',
  templateUrl: './display-partner-class-info.component.html',
  styleUrls: ['./display-partner-class-info.component.less']
})
export class DisplayPartnerClassInfoComponent implements OnInit {

  @Input() project: any;
	constructor(

  ) { }

  ngOnInit() {
    console.log("project:")
    console.log(this.project);
  }

}
