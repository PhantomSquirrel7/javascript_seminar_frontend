import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbbViewComponent } from './bbb-view.component';

describe('BbbViewComponent', () => {
  let component: BbbViewComponent;
  let fixture: ComponentFixture<BbbViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbbViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbbViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
