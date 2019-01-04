import { TestBed } from '@angular/core/testing';

import { MstShopOrderStatusService } from './mst-shop-order-status.service';

describe('MstShopOrderStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MstShopOrderStatusService = TestBed.get(MstShopOrderStatusService);
    expect(service).toBeTruthy();
  });
});
