import { TestBed } from '@angular/core/testing';

import { TrnShopOrderListService } from './trn-shop-order-list.service';

describe('TrnShopOrderListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrnShopOrderListService = TestBed.get(TrnShopOrderListService);
    expect(service).toBeTruthy();
  });
});
