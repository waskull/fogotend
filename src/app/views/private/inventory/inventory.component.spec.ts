import { ComponentFixture, TestBed } from '@angular/core/testing';

import  InventoryComponent  from './inventory.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InventoryService } from '../../../services/inventory.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [InventoryComponent],
    providers: [InventoryService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
