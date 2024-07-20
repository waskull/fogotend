import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { SaleService } from '../../../services/sale.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule, IDatePickerConfig } from 'ng2-date-picker';
import { default as dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { catchError, throwError } from 'rxjs';
import { saveAs } from 'file-saver';
import { DEF_CONF } from '../../../constants/DatePicker';
import { HeaderComponent } from '../../../components/header/header.component';
import { AuthService } from '../../../services/auth/auth.service';
dayjs.locale('es-mx');
export enum ECalendarValue {
  Dayjs = 1,
  DayjsArr,
  String,
  StringArr,
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [DatePipe, FormsModule, DpDatePickerModule, HeaderComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export default class ReportComponent implements OnInit{
  config: any = {
    ...DEF_CONF,
    format: 'YYYY-MM-DD'
  };
  option: string = 'orders';
  error:string = '';
  sending:boolean = false;
  buttonText: string = 'Compras';
  saleService = inject(SaleService);
  orderService = inject(OrderService);
  datepipe = new DatePipe('en-US');
  start:any = dayjs('2024-05-15');
  end: any = dayjs().add(1,'day');
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.setModuleName('Reportes');    
  }
  getRows() {
    this.sending = true;
    if (this.option === 'orders') {
      this.buttonText = 'Compras';
      this.orderService.getReport(this.start, this.end).pipe(
        catchError(err => {
          this.sending = false;
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al generar el reporte de compra';
          }
          return throwError(() => err);
        })
      ).subscribe((e:Blob) => {
        saveAs(e, 'reporteCompras.pdf');
        this.sending = false;
      });
    }
    else if (this.option === 'sales') {
      this.buttonText = 'Pedidos';
      this.saleService.getSalesByDate(this.start, this.end).pipe(
        catchError(err => {
          this.sending = false;
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al generar el reporte de pedido';
          }
          return throwError(() => err);
        })
      ).subscribe((e:Blob) => {
        saveAs(e, 'reportePedidos.pdf');
        this.sending = false;
      });
    }
    else {

    }
  }
  updateButton(event: any) {
    this.buttonText = event.target.options[event.target.options.selectedIndex].text;
    this.option = event.target.options[event.target.options.selectedIndex].value;
  }
}
