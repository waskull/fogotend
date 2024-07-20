import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatelayoutComponent } from './privatelayout.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PrivatelayoutComponent', () => {
  let component: PrivatelayoutComponent;
  let fixture: ComponentFixture<PrivatelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PrivatelayoutComponent, RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
