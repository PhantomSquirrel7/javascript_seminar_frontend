import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { User } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ClassesService } from 'src/app/services/swagger-api/classes.service'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-find-partner-class-content',
  templateUrl: './find-partner-class-content.component.html',
  styleUrls: ['./find-partner-class-content.component.less']
})
export class FindPartnerClassContentComponent implements OnInit {

  findPartnerForm: FormGroup;

  user: User;
  loading = false; // true if waiting for results
  results = false; // true if searchresults are in else false
  error = '';
  isSelected = false;
  selectedClass: any; // Type Class

  user_classes = [ // Todo: Replace with API
    {
      classId: 1,
      className: "Class 1"
    },
    {
      classId: 2,
      className: "Class 2"
    },
    {
      classId: 3,
      className: "Class 3"
    }
  ]

  // user_years = Array.from(Array(8).keys(), x => x+5);
  // selectedYear: number;

  // user_languages = ['English', 'Spanish', 'French', 'Italian', 'Chinese'];
  // selectedLanguage: string;

  user_lang_profs = ['Beginner (A1)', 'Beginner (A1)', 'Intermediate (B1)', 'Intermediate (B2)', 'Advanced (C1)', 'Advanced (C2)'];
  selectedLangProf: string;
  
  user_duration = ['1 day', '1 week', '2 weeks', '3 weeks', '4 weeks +'];
  selectedDuration: string;

  myClasses:any = [];

  resultClasses = [ // Replace with API
    {
      "name": "Class 1",
      "language": "English",
      "country": "au",
      "year": "8",
      "subject": "mathematics",
      "topics": [
        "addition",
        "subtraction"
      ],
      "level": 2
    },
    {
      "name": "Class 2",
      "language": "English",
      "country": "gb",
      "year": "9",
      "subject": "mathematics",
      "topics": [
        "division",
        "subtraction"
      ],
      "level": 2
    },
    {
      "name": "Class 3",
      "language": "English",
      "country": "us",
      "year": "7",
      "subject": "mathematics",
      "topics": [
        "addition",
        "multiplication"
      ],
      "level": 1
    },
    {
      "name": "Class 4",
      "language": "English",
      "country": "us",
      "year": "7",
      "subject": "mathematics",
      "topics": [
        "addition",
        "multiplication"
      ],
      "level": 1
    },
    {
      "name": "Class 5",
      "language": "English",
      "country": "us",
      "year": "7",
      "subject": "mathematics",
      "topics": [
        "addition",
        "multiplication"
      ],
      "level": 1
    },
    {
      "name": "Class 6",
      "language": "English",
      "country": "us",
      "year": "7",
      "subject": "mathematics",
      "topics": [
        "addition",
        "multiplication"
      ],
      "level": 1
    }
  ];

  constructor(private fb: FormBuilder) {
  }
 
  ngOnInit() {
    this.findPartnerForm = this.fb.group({
      selectedClass: [null],
      // selectedYear: [],
      // selectedLanguage: [],
      selectedLangProf: [],
      selectedDuration: []
    });
  }

  classSelected(){
    this.selectedClass = this.findPartnerForm.value.selectedClass;
    this.isSelected = true;
  }
  
  // yearSelected(){
  //   this.selectedYear = this.findPartnerForm.value.selectedYear;
  // }
  
  // languageSelected(){
  //   this.selectedLanguage = this.findPartnerForm.value.selectedLanguage;
  // }  
  
  langProfSelected(){
    this.selectedLangProf = this.findPartnerForm.value.selectedLangProf;
  }
  
  durationSelected(){
    this.selectedDuration = this.findPartnerForm.value.selectedDuration;
  }

  onSubmit() {
    // this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    this.loading = true;
    
    this.results = true;
    // TODO: API Call for results
    this.loading = false;

    // this.loginService
    //   .login({ email: this.f.email.value, password: this.f.password.value })
    //   .pipe(first())
    //   .subscribe({
    //     next: (response) => {
    //       this.loading = false;          
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error: (error) => {
    //       this.error = error;
    //       this._snackBar.open(this.error, 'Close', {
    //         duration: 3000
    //       });
    //       this.loading = false;
    //     },
    //   });
  }

}
