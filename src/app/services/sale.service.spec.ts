import { TestBed } from '@angular/core/testing';

import { SaleService } from './sale.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SaleService', () => {
  let service: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
