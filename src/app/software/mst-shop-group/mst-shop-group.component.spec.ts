import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MstShopGroupComponent } from './mst-shop-group.component';

describe('MstShopGroupComponent', () => {
  let component: MstShopGroupComponent;
  let fixture: ComponentFixture<MstShopGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MstShopGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MstShopGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
