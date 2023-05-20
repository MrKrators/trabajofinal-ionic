import { TestBed } from '@angular/core/testing';

import { ConndataService } from './conndata.service';

describe('ConndataService', () => {
  let service: ConndataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConndataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
