import { TestBed } from '@angular/core/testing';

import { EmptyListsGuard } from './empty-lists.guard';

describe('EmptyListsGuard', () => {
  let guard: EmptyListsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmptyListsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
