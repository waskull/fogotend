import { ComponentFixture, TestBed } from '@angular/core/testing';

import  UserComponent  from './user.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from '../../../services/user.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UserComponent],
    providers: [UserService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
