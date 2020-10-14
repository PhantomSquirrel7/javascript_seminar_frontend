import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewGamesConfigComponent } from './overview-games-config.component';

describe('OverviewGamesConfigComponent', () => {
  let component: OverviewGamesConfigComponent;
  let fixture: ComponentFixture<OverviewGamesConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewGamesConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewGamesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
