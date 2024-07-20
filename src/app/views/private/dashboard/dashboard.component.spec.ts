import { ComponentFixture, TestBed } from '@angular/core/testing';


import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { SaleService } from '../../../services/sale.service';
import { RouterTestingModule } from '@angular/router/testing';
import DashboardComponent from './dashboard.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DashboardComponent, RouterTestingModule],
    providers: [SaleService, AuthService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
