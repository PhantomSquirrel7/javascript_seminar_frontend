import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesAliasComponent } from './alias.component';

describe('AliasComponent', () => {
  let component: GamesAliasComponent;
  let fixture: ComponentFixture<GamesAliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesAliasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
