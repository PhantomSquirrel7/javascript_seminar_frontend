import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPartnerClassViewResultsComponent } from './find-partner-class-view-results.component';

describe('FindPartnerClassViewResultsComponent', () => {
  let component: FindPartnerClassViewResultsComponent;
  let fixture: ComponentFixture<FindPartnerClassViewResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPartnerClassViewResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPartnerClassViewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
