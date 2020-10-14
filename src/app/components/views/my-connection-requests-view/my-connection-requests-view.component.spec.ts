import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionRequestsViewComponent } from './my-connection-requests-view.component';

describe('MyConnectionRequestsViewComponent', () => {
  let component: MyConnectionRequestsViewComponent;
  let fixture: ComponentFixture<MyConnectionRequestsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionRequestsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
