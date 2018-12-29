import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MstShopOrderStatusComponent } from './mst-shop-order-status.component';

describe('MstShopOrderStatusComponent', () => {
  let component: MstShopOrderStatusComponent;
  let fixture: ComponentFixture<MstShopOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MstShopOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MstShopOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
