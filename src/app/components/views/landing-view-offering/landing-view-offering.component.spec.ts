import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingViewOfferingComponent } from './landing-view-offering.component';

describe('LandingViewOfferingComponent', () => {
  let component: LandingViewOfferingComponent;
  let fixture: ComponentFixture<LandingViewOfferingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingViewOfferingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingViewOfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
