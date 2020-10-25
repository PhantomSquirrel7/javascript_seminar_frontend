import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInformationViewComponent } from './class-information-view.component';

describe('ClassInformationViewComponent', () => {
  let component: ClassInformationViewComponent;
  let fixture: ComponentFixture<ClassInformationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassInformationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInformationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
