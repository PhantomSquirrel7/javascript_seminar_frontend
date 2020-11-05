import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthlieComponent } from './truthlie.component';

describe('TruthlieComponent', () => {
  let component: TruthlieComponent;
  let fixture: ComponentFixture<TruthlieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruthlieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruthlieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
