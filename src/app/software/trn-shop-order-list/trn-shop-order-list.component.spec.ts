import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnShopOrderListComponent } from './trn-shop-order-list.component';

describe('TrnShopOrderListComponent', () => {
  let component: TrnShopOrderListComponent;
  let fixture: ComponentFixture<TrnShopOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnShopOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnShopOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
