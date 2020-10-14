import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHomeContentComponent } from './landing-home-content.component';

describe('LandingHomeContentComponent', () => {
  let component: LandingHomeContentComponent;
  let fixture: ComponentFixture<LandingHomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingHomeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
