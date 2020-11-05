import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGameConfigComponent } from './quiz-game-config.component';

describe('QuizGameConfigComponent', () => {
  let component: QuizGameConfigComponent;
  let fixture: ComponentFixture<QuizGameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizGameConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizGameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
