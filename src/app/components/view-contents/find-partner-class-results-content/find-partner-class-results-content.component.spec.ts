import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPartnerClassResultsComponentComponent } from './find-partner-class-results-component.content';

describe('FindPartnerClassResultsComponentComponent', () => {
  let component: FindPartnerClassResultsComponentComponent;
  let fixture: ComponentFixture<FindPartnerClassResultsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPartnerClassResultsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPartnerClassResultsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
