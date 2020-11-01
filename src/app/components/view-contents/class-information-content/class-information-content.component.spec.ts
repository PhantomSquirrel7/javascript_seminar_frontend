import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInformationContentComponent } from './class-information-content.component';

describe('ClassInformationContentComponent', () => {
  let component: ClassInformationContentComponent;
  let fixture: ComponentFixture<ClassInformationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassInformationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInformationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
