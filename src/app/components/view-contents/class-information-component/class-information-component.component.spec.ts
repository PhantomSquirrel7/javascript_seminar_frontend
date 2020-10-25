import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInformationComponentComponent } from './class-information-component.component';

describe('ClassInformationComponentComponent', () => {
  let component: ClassInformationComponentComponent;
  let fixture: ComponentFixture<ClassInformationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassInformationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInformationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
