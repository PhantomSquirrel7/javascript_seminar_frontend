import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingOfferingContentComponent } from './landing-offering-content.component';

describe('LandingOfferingContentComponent', () => {
  let component: LandingOfferingContentComponent;
  let fixture: ComponentFixture<LandingOfferingContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingOfferingContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingOfferingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
