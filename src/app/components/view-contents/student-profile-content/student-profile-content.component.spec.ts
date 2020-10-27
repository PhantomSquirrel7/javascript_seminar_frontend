import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileContentComponent } from './student-profile-content.component';

describe('StudentProfileContentComponent', () => {
  let component: StudentProfileContentComponent;
  let fixture: ComponentFixture<StudentProfileContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfileContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
