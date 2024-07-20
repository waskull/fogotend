import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { TableComponent } from '../../../components/table/table.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ProductService } from '../../../services/product.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HeaderComponent, TableComponent, ModalComponent,DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export default class ProductComponent {
  columnNames = ['nombre','precio','stock','fecha de creación'];
  columns = ['name','price','stock','createdAt'];
  op = {delete:true,edit:true}
  itemList: any[] = [];
  productService = inject(ProductService);
  datepipe = new DatePipe('en-US');
  authService = inject(AuthService);
  loading:boolean = false;
  error:string = '';
  constructor() { }

  ngOnInit(): void {
    this.authService.setModuleName('Productos');    
    this.loadData();
  }
  loadData(){
    this.loading = true;
    this.productService.getAll().pipe(
      catchError(err => {
        this.loading = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al obtener los productos';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.itemList = res.map(e => {
        e.createdAt = this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'); 
        e.stock = e?.stock || 0;
        return e;
       
    });
    this.loading = false;
    });
  }
  edit(item: any){
    this.productService.getAll().subscribe((res) => {
      this.itemList = res;
    });
  }
  delete(item: any){
    this.productService.delete(item.id).subscribe(() => {
      this.loadData();
    });
  }
  newValue(data: any){
    this.loadData();
  }
}
