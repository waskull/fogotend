import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleformComponent } from './saleform.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { InventoryService } from '../../services/inventory.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SaleformComponent', () => {
  let component: SaleformComponent;
  let fixture: ComponentFixture<SaleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SaleformComponent],
    providers: [SaleService, UserService, InventoryService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
