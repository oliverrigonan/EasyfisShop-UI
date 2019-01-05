import { TestBed } from '@angular/core/testing';

import { RepOrderSummaryReportService } from './rep-order-summary-report.service';

describe('RepOrderSummaryReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepOrderSummaryReportService = TestBed.get(RepOrderSummaryReportService);
    expect(service).toBeTruthy();
  });
});
