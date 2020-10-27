import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTeamContentComponent } from './landing-team-content.component';

describe('LandingTeamContentComponent', () => {
  let component: LandingTeamContentComponent;
  let fixture: ComponentFixture<LandingTeamContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingTeamContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingTeamContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
