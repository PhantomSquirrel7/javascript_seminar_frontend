import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMeetingsContentComponent } from './student-meetings-content.component';

describe('StudentMeetingsContentComponent', () => {
  let component: StudentMeetingsContentComponent;
  let fixture: ComponentFixture<StudentMeetingsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMeetingsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMeetingsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
