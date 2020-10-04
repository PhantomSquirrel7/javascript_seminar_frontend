import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotPotatoGameConfigComponent } from './hot-potato-game-config.component';

describe('HotPotatoGameConfigComponent', () => {
  let component: HotPotatoGameConfigComponent;
  let fixture: ComponentFixture<HotPotatoGameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotPotatoGameConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotPotatoGameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
