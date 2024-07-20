import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TablesService } from './tables.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TablesService', () => {
  let service: TablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(TablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
