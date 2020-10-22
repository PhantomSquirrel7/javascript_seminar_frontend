import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassComponentComponent } from './create-class-component.component';

describe('CreateClassComponentComponent', () => {
  let component: CreateClassComponentComponent;
  let fixture: ComponentFixture<CreateClassComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClassComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
