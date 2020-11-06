import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTaskFormComponent } from './simple-task-form.component';

describe('SimpleTaskFormComponent', () => {
  let component: SimpleTaskFormComponent;
  let fixture: ComponentFixture<SimpleTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
