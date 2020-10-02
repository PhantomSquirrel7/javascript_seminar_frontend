import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeetingRequestsViewComponent } from './my-meeting-requests-view.component';

describe('MyMeetingRequestsViewComponent', () => {
  let component: MyMeetingRequestsViewComponent;
  let fixture: ComponentFixture<MyMeetingRequestsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMeetingRequestsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMeetingRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
