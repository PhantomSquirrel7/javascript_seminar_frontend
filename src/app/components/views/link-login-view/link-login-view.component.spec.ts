import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkLoginViewComponent } from './link-login-view.component';

describe('LinkLoginViewComponent', () => {
  let component: LinkLoginViewComponent;
  let fixture: ComponentFixture<LinkLoginViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkLoginViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkLoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
