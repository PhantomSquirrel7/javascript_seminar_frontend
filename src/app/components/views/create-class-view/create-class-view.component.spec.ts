import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassViewComponent } from './create-class-view.component';

describe('CreateClassViewComponent', () => {
  let component: CreateClassViewComponent;
  let fixture: ComponentFixture<CreateClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
