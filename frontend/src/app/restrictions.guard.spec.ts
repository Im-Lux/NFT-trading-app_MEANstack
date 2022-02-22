import { TestBed } from '@angular/core/testing';

import { RestrictionsGuard } from './restrictions.guard';

describe('RestrictionsGuard', () => {
  let guard: RestrictionsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestrictionsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
