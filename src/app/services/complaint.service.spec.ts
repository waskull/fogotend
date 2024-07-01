import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComplaintService } from './complaint.service';

describe('ComplaintService', () => {
  let service: ComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
