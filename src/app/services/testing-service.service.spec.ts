import { TestBed } from '@angular/core/testing';

import { TestingServiceService } from './testing-service.service';

describe('TestingServiceService', () => {
  let service: TestingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
