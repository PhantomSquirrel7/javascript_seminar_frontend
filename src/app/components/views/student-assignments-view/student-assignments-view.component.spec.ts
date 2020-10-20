import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentsViewComponent } from './student-assignments-view.component';

describe('StudentAssignmentsViewComponent', () => {
  let component: StudentAssignmentsViewComponent;
  let fixture: ComponentFixture<StudentAssignmentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
