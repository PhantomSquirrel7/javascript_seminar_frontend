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

  user_projct_duration = [
		{
			"name": "1 Week",
			"val": 1
		},
		{
			"name": "2 Weeks",
			"val": 2
		},
		{
			"name": "1 Month",
			"val": 4
		},
		{
			"name": "More than 1 Month",
			"val": 10
		}
  ];
  
  user_meeting_frequency = [
		{
			"name": "Once per Week",
			"val": 1
		},
		{
			"name": "Once in 2 Weeks",
			"val": 2
		},
		{
			"name": "Once per Month",
			"val": 4
		}
  ];


  ngOnInit() {
    console.log("project:")
    console.log(this.project);
  }

  mapFrequency(val){
    for(let p of this.user_meeting_frequency){
      if(p.val == val){
        return p.name;
      }
    }
    return val;
  }

  mapDuration(val){
    for(let p of this.user_projct_duration){
      if(p.val == val){
        return p.name;
      }
    }
    return val + "x/week";
  }

  getFlag(prjct){
    return prjct.country.toLowerCase();
  }

}
