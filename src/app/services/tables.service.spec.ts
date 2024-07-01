import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TablesService } from './tables.service';

describe('TablesService', () => {
  let service: TablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
