import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingViewTeamComponent } from './landing-view-team.component';

describe('LandingViewTeamComponent', () => {
  let component: LandingViewTeamComponent;
  let fixture: ComponentFixture<LandingViewTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingViewTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
