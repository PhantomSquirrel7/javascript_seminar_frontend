import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavigationComponent } from './student-navigation.component';

describe('StudentNavigationComponent', () => {
  let component: StudentNavigationComponent;
  let fixture: ComponentFixture<StudentNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
