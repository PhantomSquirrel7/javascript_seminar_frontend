import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtolGameConfigComponent } from './ttol-game-config.component';

describe('TtolGameConfigComponent', () => {
  let component: TtolGameConfigComponent;
  let fixture: ComponentFixture<TtolGameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtolGameConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtolGameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
