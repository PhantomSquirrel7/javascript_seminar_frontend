import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMeetingsViewComponent } from './student-meetings-view.component';

describe('StudentMeetingsViewComponent', () => {
  let component: StudentMeetingsViewComponent;
  let fixture: ComponentFixture<StudentMeetingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMeetingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMeetingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
