import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeViewComponent } from './student-home-view.component';

describe('StudentHomeViewComponent', () => {
  let component: StudentHomeViewComponent;
  let fixture: ComponentFixture<StudentHomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
