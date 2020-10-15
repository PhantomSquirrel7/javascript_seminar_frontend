import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassContactComponentComponent } from './class-contact-component.component';

describe('ClassContactComponentComponent', () => {
  let component: ClassContactComponentComponent;
  let fixture: ComponentFixture<ClassContactComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassContactComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassContactComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
