import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepOrderSummaryReportComponent } from './rep-order-summary-report.component';

describe('RepOrderSummaryReportComponent', () => {
  let component: RepOrderSummaryReportComponent;
  let fixture: ComponentFixture<RepOrderSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepOrderSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepOrderSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
