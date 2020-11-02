import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassContactContentComponent } from './class-contact-content.component';

describe('ClassContactContentComponent', () => {
  let component: ClassContactContentComponent;
  let fixture: ComponentFixture<ClassContactContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassContactContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassContactContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
