import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassContentComponent } from './create-class-content.component';

describe('CreateClassContentComponent', () => {
  let component: CreateClassContentComponent;
  let fixture: ComponentFixture<CreateClassContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClassContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
