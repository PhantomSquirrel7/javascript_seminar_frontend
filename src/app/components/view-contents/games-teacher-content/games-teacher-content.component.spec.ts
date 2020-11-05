import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTeacherContentComponent } from './games-teacher-content.component';

describe('GamesTeacherContentComponent', () => {
  let component: GamesTeacherContentComponent;
  let fixture: ComponentFixture<GamesTeacherContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesTeacherContentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesTeacherContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
