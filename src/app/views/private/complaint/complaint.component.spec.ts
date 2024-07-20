import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ComplaintComponent  from './complaint.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComplaintService } from '../../../services/complaint.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ComplaintComponent', () => {
  let component: ComplaintComponent;
  let fixture: ComponentFixture<ComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ComplaintComponent],
    providers: [ComplaintService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
