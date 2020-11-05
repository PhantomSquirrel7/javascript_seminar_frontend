import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawItFormComponent } from './draw-it-form.component';

describe('DrawItFormComponent', () => {
  let component: DrawItFormComponent;
  let fixture: ComponentFixture<DrawItFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawItFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawItFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
