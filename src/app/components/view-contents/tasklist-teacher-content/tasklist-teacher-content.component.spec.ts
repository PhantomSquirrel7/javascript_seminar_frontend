import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistTeacherContentComponent } from './tasklist-teacher-content.component';

describe('TasklistTeacherContentComponent', () => {
  let component: TasklistTeacherContentComponent;
  let fixture: ComponentFixture<TasklistTeacherContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasklistTeacherContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistTeacherContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
