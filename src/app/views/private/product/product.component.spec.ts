import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ProductComponent  from './product.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../../services/product.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProductComponent],
    providers: [ProductService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
