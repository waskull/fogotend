import { ComponentFixture, TestBed } from '@angular/core/testing';

import  OrderComponent  from './order.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from '../../../services/order.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [OrderComponent],
    providers: [OrderService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
