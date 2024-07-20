import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsaleformComponent } from './editsaleform.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { InventoryService } from '../../services/inventory.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EditsaleformComponent', () => {
  let component: EditsaleformComponent;
  let fixture: ComponentFixture<EditsaleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditsaleformComponent],
    providers: [SaleService, UserService, InventoryService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsaleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
