import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TableComponent } from '../../../components/table/table.component';
import { HeaderComponent } from "../../../components/header/header.component";
import { AuthService } from '../../../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    imports: [ModalComponent, TableComponent, HeaderComponent,DatePipe]
})
export default class OrderComponent implements OnInit {
  columnNames = ['idd','artículos comprados','precio','realizado por','Fecha del pedido']
  columns = ['idd','items','price','bought_by', 'date'];
  op = {delete:true,edit:false, show:true};
  datepipe = new DatePipe('en-US');
  orderList: any[] = [];
  loading:boolean = false;
  error:string = "";
  orderService = inject(OrderService);
  authService = inject(AuthService);
  constructor() { }

  ngOnInit(): void {
    this.authService.setModuleName('Compras');    
    this.loadData();
  }
  loadData(){
    this.loading = true;
    this.orderService.getAll().pipe(
      catchError(err => {
        this.loading = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al obtener las compras';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.orderList = [];
      res.forEach(e => {
        let items: string = '';
        e.order_items.forEach((r: {item:{name:string};quantity:number}) => {
          items+=r?.item?.name+" x "+ r.quantity+", ";
        });
        this.orderList.push({
          price: e.price,
          bought_by: e.bought_by.firstname+" "+e.bought_by.lastname,
          salesman: e.bought_by.firstname+" "+e.bought_by.lastname,
          salesman_email: e.bought_by.email,
          salesman_phone: e.bought_by.phone,
          date: this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'),
          id: e.id,
          idd: e.id < 10 ? `#0${e.id}` : `#${e.id}`,
          items: items,
          ite: e.order_items.map((ee: { id: any; name: string; price:string, quantity: string;item:{name:string, price:string} }) => {
            return {id: ee.id, name:ee?.item.name, qty:parseInt(ee.quantity), price: parseFloat(ee?.item?.price)};
          })
        });
      });
      this.loading = false;
    });
  }
  edit(data: any){
    this.loadData();
  }
  delete(data: any){
    this.orderService.delete(data.id).subscribe(e => {
      this.loadData();
    });
  }
  newValue(data: any){
    this.loadData();
  }

}
