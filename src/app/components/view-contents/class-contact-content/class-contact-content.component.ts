import { Component, OnInit, Input } from '@angular/core';
import { CustomProjectsService } from '../../../services/custom';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { report } from 'process';
import { Body10 } from '@app/models';
import { CLASS_LEVEL } from '@app/components/common/backend-util/common-structures/class-level';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';

@Component({
  selector: 'app-class-contact-content',
  templateUrl: './class-contact-content.component.html',
  styleUrls: ['./class-contact-content.component.less']
})
export class ClassContactContentComponent{
  
  @Input() actClass: any;
  @Input() teacher: any;
  @Input() selfClass: any; // your class
	constructor(
    private fb: FormBuilder,
    private projectsService: CustomProjectsService
  ) { }

  contactTeacherForm: FormGroup;
  sent = false;
  messageTextValue = "";
  requested = false;

  countryFlagId = ""

  addMessageError = false;

  classLevelList = null;

  languageList = null;

  timeLeft: number = 60;
  interval;
  subscribeTimer: any;

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
	selectedDuration: any;
	
	
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
    this.contactTeacherForm = this.fb.group({
      messageText: [""]
    });
    console.log(this.actClass);
    this.requested = false;
    this.sent = false;
    this.classLevelList = CLASS_LEVEL;
    this.languageList = LANGUAGE_LIST;
  }

  teacherInfo(){ // TODO: redirect to teacher profile
    console.log(this.teacher.id);
  }

  onSubmit(){ // sent notification to other teacher
    this.addMessageError = false;
    console.log("msg:");
    console.log(this.contactTeacherForm.value.messageText);

    if (this.contactTeacherForm.value.messageText == ""){
      this.addMessageError = true;
    }
    else{
      let myBody: Body10= {
        "_class": this.actClass.id.toString(),
        "initialMessage": this.contactTeacherForm.value.messageText
      };

      this.projectsService.classesClassIdProjectsPostCustom(myBody, this.selfClass.id.toString()).subscribe(
        data => {
          console.log(data);
          this.sent = true;
          this.requested = true;
        }
      );

      this.contactTeacherForm.value.messageText = '';
      this.contactTeacherForm.value.messageText = null;
      this.messageTextValue = '';
    }
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

  ngOnChanges(){
    console.log("changes again:");
    console.log(this.actClass);
    this.requested = false;
    this.sent = false;
    if (this.actClass.country != undefined){
      this.countryFlagId = this.actClass.country.toLowerCase();
      console.log("Flag:");
      console.log(this.countryFlagId);
    }    
    this.classLevelList = CLASS_LEVEL;
    this.languageList = LANGUAGE_LIST;
  }
}

