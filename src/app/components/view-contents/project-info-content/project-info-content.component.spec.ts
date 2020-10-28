import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoContentComponent } from './project-info-content.component';

describe('ProjectInfoContentComponent', () => {
  let component: ProjectInfoContentComponent;
  let fixture: ComponentFixture<ProjectInfoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
