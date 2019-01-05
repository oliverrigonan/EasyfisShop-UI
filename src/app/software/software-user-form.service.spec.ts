import { TestBed } from '@angular/core/testing';

import { SoftwareUserFormService } from './software-user-form.service';

describe('SoftwareUserFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoftwareUserFormService = TestBed.get(SoftwareUserFormService);
    expect(service).toBeTruthy();
  });
});
