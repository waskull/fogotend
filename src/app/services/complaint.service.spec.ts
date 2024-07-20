import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComplaintService } from './complaint.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ComplaintService', () => {
  let service: ComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
