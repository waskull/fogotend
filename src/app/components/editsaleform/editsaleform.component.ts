import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Method, statusEnum } from '../../constants/Enum';
import { environment } from '../../../environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'editsaleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './editsaleform.component.html',
  styleUrl: './editsaleform.component.scss'
})
export class EditsaleformComponent implements OnInit{
  baseURL:string = environment.baseURL;
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  @Input() show: boolean = false;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  clientList: any[] = [];
  inventoryList: any[] = [];
  sending:boolean = false;
  deliveryList: any[] = [];
  selectedItems: any[] = [];
  total: number = 0;
  userService = inject(UserService);
  STATUS_WAITING = statusEnum.WAITING;
  STATUS_INCOMPLETED = statusEnum.INCOMPLETE;
  STATUS_COMPLETED = statusEnum.COMPLETED;
  STATUS_COMPLETED_TABLE = statusEnum.COMPLETED_TABLE;
  CASH = Method.Cash
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  salesService = inject(SaleService);
  ngOnInit(): void {
    this.dataForm = this.initForm();    
    this.selectedItems = this?.data?.ite;
    this.data?.ite?.forEach((e:any) => {
      this.total+=e?.qty*e?.price;
    });
    this.loadFormData();
  }

  loadFormData() {
    this.productService.getAllProducts().subscribe(res => {
      this.inventoryList = res;
    });
    this.userService.getAll().subscribe(res => {
      this.clientList = res;
    });
    this.userService.getAllDelivery().subscribe(res => {
      this.deliveryList = res;
    });
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      delivery_man: [undefined, [Validators.required, Validators.min(1)]],
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData() {
    this.sending = true;
    this.salesService.update(this.data.id, parseInt(this.dataForm.value.delivery_man)).pipe(
      catchError(err => {
        this.sending = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al editar la venta';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.total = 0;
      this.emitForm.emit({});
      this.sending = false;
    });

  }
}
