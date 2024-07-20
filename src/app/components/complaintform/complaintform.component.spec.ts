import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComplaintformComponent } from './complaintform.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ComplaintformComponent', () => {
  let component: ComplaintformComponent;
  let fixture: ComponentFixture<ComplaintformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ComplaintformComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
