import { TestBed } from '@angular/core/testing';

import { MstShopGroupService } from './mst-shop-group.service';

describe('MstShopGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MstShopGroupService = TestBed.get(MstShopGroupService);
    expect(service).toBeTruthy();
  });
});
