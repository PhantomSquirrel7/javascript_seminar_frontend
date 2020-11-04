import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeetingRequestsContentComponent } from './my-meeting-requests-content.component';

describe('MyMeetingRequestsContentComponent', () => {
  let component: MyMeetingRequestsContentComponent;
  let fixture: ComponentFixture<MyMeetingRequestsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMeetingRequestsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMeetingRequestsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
