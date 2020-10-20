import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentsContentComponent } from './student-assignments-content.component';

describe('StudentAssignmentsContentComponent', () => {
  let component: StudentAssignmentsContentComponent;
  let fixture: ComponentFixture<StudentAssignmentsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
