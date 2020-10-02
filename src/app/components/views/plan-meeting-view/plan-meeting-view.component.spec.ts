import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMeetingViewComponent } from './plan-meeting-view.component';

describe('PlanMeetingViewComponent', () => {
  let component: PlanMeetingViewComponent;
  let fixture: ComponentFixture<PlanMeetingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanMeetingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMeetingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
