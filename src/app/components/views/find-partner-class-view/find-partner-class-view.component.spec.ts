import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPartnerClassViewComponent } from './find-partner-class-view.component';

describe('FindPartnerClassViewComponent', () => {
  let component: FindPartnerClassViewComponent;
  let fixture: ComponentFixture<FindPartnerClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPartnerClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPartnerClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
