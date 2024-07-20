import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TablesaleformComponent } from './tablesaleform.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TablesaleformComponent', () => {
  let component: TablesaleformComponent;
  let fixture: ComponentFixture<TablesaleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TablesaleformComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(TablesaleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
