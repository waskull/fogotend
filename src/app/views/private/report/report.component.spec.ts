import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ReportComponent  from './report.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from '../../../services/order.service';
import { SaleService } from '../../../services/sale.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReportComponent],
    providers: [SaleService, OrderService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
