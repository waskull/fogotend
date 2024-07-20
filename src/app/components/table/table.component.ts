import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { UserformComponent } from "../userform/userform.component";
import { SaleformComponent } from '../saleform/saleform.component';
import { OrderformComponent } from '../orderform/orderform.component';
import { ProductformComponent } from '../productform/productform.component';
import { ComplaintStatus, Rol, statusEnum } from '../../constants/Enum';
import { EditsaleformComponent } from '../editsaleform/editsaleform.component';
import { ReportgeneratorComponent } from '../reportgenerator/reportgenerator.component';
import { ClientformComponent } from '../clientform/clientform.component';
import { ComplaintformComponent } from '../complaintform/complaintform.component';
import { DialogComponent } from '../dialog/dialog.component';
declare var window: any;

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [
    FormsModule,
    NgxPaginationModule,
    EditsaleformComponent,
    FilterPipe,
    UserformComponent,
    SaleformComponent,
    OrderformComponent,
    ProductformComponent,
    ClientformComponent,
    ReportgeneratorComponent,
    ComplaintformComponent,
    DialogComponent,
    UpperCasePipe
  ]
})
export class TableComponent {
  ff: any;
  dialog: any;
  dialogD: any;
  dialogCancel: any;
  dialogC: any;
  search: string = '';
  @Input() hideSearch: boolean = false;
  @Input() clientCanCancel: boolean = false;
  @Input() colNames: string[] = [];
  @Input() columns: string[] = [];
  @Input() rowData: any[] = [];
  @Input() operations: operations = { edit: false, delete: false, show: false };
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<number>();
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onConfirmOrder = new EventEmitter<any>();
  @Input() userModal: boolean = false;
  @Input() productModal: boolean = false;
  @Input() inventoryModal: boolean = false;
  @Input() saleModal: boolean = false;
  @Input() orderModal: boolean = false;
  @Input() scheduleModal: boolean = false;
  @Input() companyModal: boolean = false;
  @Input() providerModal: boolean = false;
  @Input() clientModal: boolean = false;
  @Input() billModal: boolean = false;
  @Input() complaintModal: boolean = false;
  @Input() report: boolean = false;
  @Input() showConfirm: boolean = false;
  status = statusEnum;
  ADMIN:string = Rol.ADMIN;
  DELIVERY_MAN:string = Rol.DELIVERY_MAN;
  CLIENT:string = Rol.CLIENT;
  CASHIER:string = Rol.CASHIER;
  MANAGER:string = Rol.MANAGER;
  ComplaintStatus = ComplaintStatus;
  CONFIRMED_BY_CLIENT = "Pedido confirmado por el cliente";
  isClient: boolean = false;
  authService = inject(AuthService);

  ngOnInit(): void {
    const data = this.authService.currentUser()?.roles;
    if (data?.includes(Rol.CLIENT)) {
      this.isClient = true;
    }

  }

  confirmOrder(data:any){
    this.openUserConfirmDialog(data.id.toString());
    //this.onConfirmOrder.emit(data);
  }
  orderConfirm(data:any){
    this.onConfirmOrder.emit(data);
    this.dialogC.hide();
  }

  getRol(){
    return this.authService.currentUser()?.roles[0];
  }

  p: number = 1;
  rowsNumber: number = 0;

  delete(data: any) {
    this.openDeleteDialog(data.id.toString());
    // if (confirm('¿Deseas borrar este registro?')) this.onDelete.emit(data);
  }
  userCancel(data: any) {
    this.onCancel.emit(data.id);
    this.dialogCancel.hide();
  }
  cancel(data: any) {
    // if (confirm('¿Deseas cancelar este pedido?')) this.onCancel.emit(data);
    this.cancelDialog(data.id.toString());
  }
  confirm(id: number,delivery_man_id:number) {
    this.openDialog(id.toString());
    // if (confirm('¿Deseas confirmar la entrega de este pedido?')) {
    //   this.onConfirm.emit({id,delivery_man_id});
    // }
  }
  clean():void{
    this.search = '';
  }
  confirmm(data:any){
    this.onConfirm.emit({id:data.id,delivery_man_id: data.delivery_man_id});
    this.dialog.hide();
  }
  deleteRow(data:any){
    this.onDelete.emit(data);
    this.dialogD.hide();
  }
  edit(data: any) {
    this.onEdit.emit(data);
    this.ff.hide();
  }
  open(id: number) {
    this.ff = new window.bootstrap.Modal(
      document.getElementById(id.toString())
    );
    this.ff.show();
  }
  openDialog(id: string) {
    this.dialog = new window.bootstrap.Modal(
      document.getElementById(id+"Dialog")
    );
    this.dialog.show();
  }

  openDeleteDialog(id:string){
    this.dialogD = new window.bootstrap.Modal(
      document.getElementById(id+"DeleteDialog")
    );
    this.dialogD.show();
  }
  cancelDialog(id:string){
    this.dialogCancel = new window.bootstrap.Modal(
      document.getElementById(id+"Cancel")
    );
    this.dialogCancel.show();
  }

  openUserConfirmDialog(id:string){
    this.dialogC = new window.bootstrap.Modal(
      document.getElementById(id+"UserConfirm")
    );
    this.dialogC.show();
  }

  public getStyle(status: string): string {
    if (status === this.status.INCOMPLETE) return 'table-warning';
    if (status === this.status.WAITING) return 'table-primary';
    if (status === this.status.COOKING) return 'table-info';
    if (status === this.status.COMPLETED || status === this.status.COMPLETED_TABLE) return 'table-success';
    if (status === this.status.CANCELED || status === this.status.CANCELED_SYSTEM) return 'table-danger';
    if(status === this.ComplaintStatus.ACCEPTED) return 'table-success';
    if(status === this.ComplaintStatus.PENDING) return 'table-warning';
    if(status === this.ComplaintStatus.REJECTED) return 'table-danger';
    if(status === this.ComplaintStatus.WAITING) return 'table-default';
    else return 'table-default';
  }
}

interface operations {
  edit?: boolean,
  delete?: boolean,
  show?: boolean
};