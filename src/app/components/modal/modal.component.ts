import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter, inject } from '@angular/core';
import { UserformComponent } from '../userform/userform.component';
import { ProductformComponent } from '../productform/productform.component';
import { SaleformComponent } from '../saleform/saleform.component';
import { OrderformComponent } from '../orderform/orderform.component';
import { CommonModule } from '@angular/common';
import { ClientformComponent } from '../clientform/clientform.component';
import { ComplaintformComponent } from '../complaintform/complaintform.component';
import { TablesaleformComponent } from '../tablesaleform/tablesaleform.component';
import { AuthService } from '../../services/auth/auth.service';
declare var window: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [UserformComponent, ProductformComponent,TablesaleformComponent,ComplaintformComponent, SaleformComponent, OrderformComponent,ClientformComponent, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() buttonName:string = 'Nuevo Registro';
  @Input() data!:any;
  @Input() modalId = 'modal';
  @Output() emitData = new EventEmitter<any>();
  formModal: any;
  @Input() userForm: boolean = false;
  @Input() clientForm: boolean = false;
  @Input() productForm: boolean = false;
  @Input() inventoryForm: boolean = false;
  @Input() saleForm: boolean = false;
  @Input() orderForm: boolean = false;
  @Input() providerForm: boolean = false;
  @Input() complaintForm: boolean = false;
  @Input() tablesForm: boolean = false;
  authService = inject(AuthService);

  openFormModal() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById(this.modalId)
    );
    this.formModal.show();
  }

  getRol(){
    return this.authService.currentUser()?.roles[0];
  }

  emitUser(data:any){
    this.emitData.emit(data);
    this.formModal.hide();
  }

  close(){
    this.formModal.hide();
  }
}
