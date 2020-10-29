import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentContentComponent } from './create-student-content.component';

describe('CreateStudentContentComponent', () => {
  let component: CreateStudentContentComponent;
  let fixture: ComponentFixture<CreateStudentContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
