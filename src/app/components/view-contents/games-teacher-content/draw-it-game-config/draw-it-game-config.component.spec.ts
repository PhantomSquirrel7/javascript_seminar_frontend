import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawItGameConfigComponent } from './draw-it-game-config.component';

describe('DrawItGameConfigComponent', () => {
  let component: DrawItGameConfigComponent;
  let fixture: ComponentFixture<DrawItGameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawItGameConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawItGameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
