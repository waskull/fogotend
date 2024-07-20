import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderformComponent } from './orderform.component';
import { OrderService } from '../../services/order.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InventoryService } from '../../services/inventory.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OrderformComponent', () => {
  let component: OrderformComponent;
  let fixture: ComponentFixture<OrderformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [OrderformComponent],
    providers: [OrderService, InventoryService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
