import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionRequestsContentComponent } from './my-connection-requests-content.component';

describe('MyConnectionRequestsContentComponent', () => {
  let component: MyConnectionRequestsContentComponent;
  let fixture: ComponentFixture<MyConnectionRequestsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionRequestsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionRequestsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
