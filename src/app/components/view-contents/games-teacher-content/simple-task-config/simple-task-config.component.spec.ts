import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTaskConfigComponent } from './simple-task-config.component';

describe('SimpleTaskConfigComponent', () => {
  let component: SimpleTaskConfigComponent;
  let fixture: ComponentFixture<SimpleTaskConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTaskConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTaskConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
