import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewContentComponent } from './profile-view-content.component';

describe('ProfileViewContentComponent', () => {
  let component: ProfileViewContentComponent;
  let fixture: ComponentFixture<ProfileViewContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
