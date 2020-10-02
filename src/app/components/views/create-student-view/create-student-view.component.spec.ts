import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentViewComponent } from './create-student-view.component';

describe('CreateStudentViewComponent', () => {
  let component: CreateStudentViewComponent;
  let fixture: ComponentFixture<CreateStudentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
