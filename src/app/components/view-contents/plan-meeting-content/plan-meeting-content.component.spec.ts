import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMeetingContentComponent } from './plan-meeting-content.component';

describe('PlanMeetingContentComponent', () => {
  let component: PlanMeetingContentComponent;
  let fixture: ComponentFixture<PlanMeetingContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanMeetingContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMeetingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
