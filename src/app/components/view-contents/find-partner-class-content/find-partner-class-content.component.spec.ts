import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPartnerClassContentComponent } from './find-partner-class-content.component';

describe('FindPartnerClassContentComponent', () => {
  let component: FindPartnerClassContentComponent;
  let fixture: ComponentFixture<FindPartnerClassContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPartnerClassContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPartnerClassContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
