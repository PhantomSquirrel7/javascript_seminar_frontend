import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bbb-view',
  templateUrl: './bbb-view.component.html',
  styleUrls: ['./bbb-view.component.less']
})
export class BbbViewComponent implements OnInit {
  @Input()
  moderatorUrl;

  sanitizedUrl : SafeResourceUrl;

  constructor(private dom:DomSanitizer) { }
  
  ngOnInit(): void {
    this.sanitizedUrl = this.dom.bypassSecurityTrustResourceUrl(this.moderatorUrl.joinUrl);
  }
}
