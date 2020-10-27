import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeContentComponent } from './student-home-content.component';

describe('StudentHomeContentComponent', () => {
  let component: StudentHomeContentComponent;
  let fixture: ComponentFixture<StudentHomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
