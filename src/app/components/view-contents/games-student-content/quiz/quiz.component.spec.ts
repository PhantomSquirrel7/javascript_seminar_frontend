import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesQuizComponent } from './quiz.component';

describe('GamesQuizComponent', () => {
  let component: GamesQuizComponent;
  let fixture: ComponentFixture<GamesQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
