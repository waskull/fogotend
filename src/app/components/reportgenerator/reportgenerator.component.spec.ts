import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgeneratorComponent } from './reportgenerator.component';
import { OrderService } from '../../services/order.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SaleService } from '../../services/sale.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReportgeneratorComponent', () => {
  let component: ReportgeneratorComponent;
  let fixture: ComponentFixture<ReportgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReportgeneratorComponent],
    providers: [SaleService, OrderService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
