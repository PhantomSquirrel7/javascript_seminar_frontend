import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasFormComponent } from './alias-form.component';

describe('AliasFormComponent', () => {
  let component: AliasFormComponent;
  let fixture: ComponentFixture<AliasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
