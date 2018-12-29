import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnShopOrderDetailComponent } from './trn-shop-order-detail.component';

describe('TrnShopOrderDetailComponent', () => {
  let component: TrnShopOrderDetailComponent;
  let fixture: ComponentFixture<TrnShopOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnShopOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnShopOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
