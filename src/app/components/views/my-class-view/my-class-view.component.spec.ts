import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassViewComponent } from './my-class-view.component';

describe('MyClassViewComponent', () => {
  let component: MyClassViewComponent;
  let fixture: ComponentFixture<MyClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
