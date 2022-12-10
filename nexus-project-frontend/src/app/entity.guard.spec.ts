import { TestBed } from '@angular/core/testing';

import { EntityGuard } from './entity.guard';

describe('EntityGuard', () => {
  let guard: EntityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
