import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TablesaleformComponent } from './tablesaleform.component';

describe('TablesaleformComponent', () => {
  let component: TablesaleformComponent;
  let fixture: ComponentFixture<TablesaleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesaleformComponent, HttpClientTestingModule]
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
