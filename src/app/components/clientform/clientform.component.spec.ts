import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientformComponent } from './clientform.component';

describe('ClientformComponent', () => {
  let component: ClientformComponent;
  let fixture: ComponentFixture<ClientformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientformComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
