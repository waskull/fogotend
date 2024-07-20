import { ComponentFixture, TestBed } from '@angular/core/testing';

import  SaleComponent from './sale.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SaleService } from '../../../services/sale.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SaleComponent],
    providers: [SaleService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
