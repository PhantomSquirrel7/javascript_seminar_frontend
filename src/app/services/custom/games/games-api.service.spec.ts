import { TestBed } from '@angular/core/testing';

import { GamesApiService } from './games-api.service';

describe('GamesApiService', () => {
  let service: GamesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
