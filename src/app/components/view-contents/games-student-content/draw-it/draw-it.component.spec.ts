import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawItComponent } from './draw-it.component';

describe('DrawItComponent', () => {
  let component: DrawItComponent;
  let fixture: ComponentFixture<DrawItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
