import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesStudentContentComponent } from './games-student-content.component';

describe('GamesStudentContentComponent', () => {
  let component: GamesStudentContentComponent;
  let fixture: ComponentFixture<GamesStudentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesStudentContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesStudentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
