import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ClientformComponent } from './clientform.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClientformComponent', () => {
  let component: ClientformComponent;
  let fixture: ComponentFixture<ClientformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ClientformComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
