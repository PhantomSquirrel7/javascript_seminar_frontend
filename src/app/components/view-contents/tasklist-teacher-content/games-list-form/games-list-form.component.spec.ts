import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListFormComponent } from './games-list-form.component';

describe('GamesListFormComponent', () => {
  let component: GamesListFormComponent;
  let fixture: ComponentFixture<GamesListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
