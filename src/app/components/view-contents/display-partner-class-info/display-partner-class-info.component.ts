import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../../../services/swagger-api/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { report } from 'process';
import { CLASS_LEVEL } from '@app/components/common/backend-util/common-structures/class-level';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';

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

  classLevelList = null;

  languageList = null;


  ngOnInit() {
    console.log("project:")
    console.log(this.project);
    this.classLevelList = CLASS_LEVEL;
    this.languageList = LANGUAGE_LIST;
  }

  ngOnChanges(){
    this.classLevelList = CLASS_LEVEL;
    this.languageList = LANGUAGE_LIST;
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

  mapClassLevel(level){
    let tempClassLevel = this.classLevelList.find(
      (item) => item.value == level
    );
    return tempClassLevel
    ? tempClassLevel.name
    : null;
  }

  mapLanguage(lang){
    let tempLang = this.languageList.find(
      (item) => item.value == lang
    );
    return tempLang
    ? tempLang.name
    : null;
  }

}
