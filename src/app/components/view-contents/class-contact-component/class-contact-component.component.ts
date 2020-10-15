import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-contact-component',
  templateUrl: './class-contact-component.component.html',
  styleUrls: ['./class-contact-component.component.less']
})
export class ClassContactComponentComponent{

  @Input() actClass: any;


}

