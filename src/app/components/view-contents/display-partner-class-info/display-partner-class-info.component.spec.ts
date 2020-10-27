import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPartnerClassInfoComponent } from './display-partner-class-info.component';

describe('DisplayPartnerClassInfoComponent', () => {
  let component: DisplayPartnerClassInfoComponent;
  let fixture: ComponentFixture<DisplayPartnerClassInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPartnerClassInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPartnerClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
