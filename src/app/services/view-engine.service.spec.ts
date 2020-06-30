import { TestBed } from '@angular/core/testing';

import { ViewEngineService } from './view-engine.service';

describe('ViewEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewEngineService = TestBed.get(ViewEngineService);
    expect(service).toBeTruthy();
  });
});
