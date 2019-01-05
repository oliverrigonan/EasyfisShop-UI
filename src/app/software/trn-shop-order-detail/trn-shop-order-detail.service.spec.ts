import { TestBed } from '@angular/core/testing';

import { TrnShopOrderDetailService } from './trn-shop-order-detail.service';

describe('TrnShopOrderDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrnShopOrderDetailService = TestBed.get(TrnShopOrderDetailService);
    expect(service).toBeTruthy();
  });
});
