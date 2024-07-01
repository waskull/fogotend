import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ComplaintComponent  from './complaint.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComplaintService } from '../../../services/complaint.service';

describe('ComplaintComponent', () => {
  let component: ComplaintComponent;
  let fixture: ComponentFixture<ComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintComponent, HttpClientTestingModule],
      providers:[ComplaintService]
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
