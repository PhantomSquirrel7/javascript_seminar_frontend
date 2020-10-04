import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasGameConfigComponent } from './alias-game-config.component';

describe('AliasGameConfigComponent', () => {
  let component: AliasGameConfigComponent;
  let fixture: ComponentFixture<AliasGameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliasGameConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasGameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
