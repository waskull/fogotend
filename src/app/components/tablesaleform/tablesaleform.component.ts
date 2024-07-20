import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Method } from '../../constants/Enum';
import { OnlynumbersDirective } from '../../onlynumbers.directive';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'tablesaleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './tablesaleform.component.html',
  styleUrl: './tablesaleform.component.scss'
})
export class TablesaleformComponent {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  sending:boolean = false;
  error: string = '';
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  salesService = inject(SaleService);
  // clientService = inject(ClientService);
  methods = Method;
  // clientList: any[] = [];
  inventoryList: any[] = [];
  deliveryList: any[] = [];
  selectedItems: any[] = [];
  clientList: any[] = [];
  total: number = 0;
  subtotal:number = 0;
  userService = inject(UserService);
  clientService = inject(ClientService)
  baseURL = environment.baseURL;

  

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.loadFormData();
  }
  add(i:any){
    let item = this.inventoryList.find(x => x.id === i);
    let t = false;
    this.selectedItems.forEach(e => {
      if (e.id === item.id) t = true;
    });
    if (!t) {
      item.quantity = 1;
      this.selectedItems.push(item);
      this.calculateTotal();
    }
    this.dataForm.patchValue({ quantity: 1 });
  }

  addItem(item: any) {
    item = JSON.parse(item);
    let t = false;
    this.selectedItems.forEach(e => {
      if (e.id === item.id) t = true;
    });
    if (!t) {
      item.quantity = 1;
      this.selectedItems.push(item);
      this.calculateTotal();
    }
    this.dataForm.patchValue({ quantity: 1 });
  }

  minus(product: any){
    if(product.quantity <= 1) return;
    const isItemInCart = this.selectedItems.find((cartItem) => cartItem.id === product.id);
    if (isItemInCart) {
      this.selectedItems.forEach((item) => {
            if (item.id === product.id) {
                item.quantity--;
            }
        });
    }
    this.calculateTotal();
  }

  plus(product:any){
      const isItemInCart = this.selectedItems.find((cartItem) => cartItem.id === product.id);
      if (isItemInCart) {
        this.selectedItems.forEach((item) => {
              if (item.id === product.id) {
                  item.quantity++;
              }
          });
      }
      this.calculateTotal();

  }

  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(res => res.id !== item.id);
    this.calculateTotal();
  }

  calculateTotal() {
    this.subtotal = 0;
    this.total = 0;
    this.selectedItems.forEach((e: { wholesale_price:string ,price:string, quantity: string; }) => {
      this.subtotal += parseFloat(e.price) * parseInt(e.quantity);
    });
    // this.selectedItems.forEach((e: { item: { price: string; wholesale_price:string }; quantity: string; }) => {
    //   if(this.subtotal>=10) {
    //     this.total += parseFloat(e.item.wholesale_price) * parseInt(e.quantity);
    //   }
    //   else{
    //     this.total += parseFloat(e.item.price) * parseInt(e.quantity);
    //   }
    // });
    this.total = this.subtotal;
  }

  loadFormData() {
    this.productService.getAllProducts().subscribe(res => {
      this.inventoryList = res;
    });
    this.clientService.getAll().subscribe(res => {
      this.clientList = res;
    });
    this.userService.getAllDelivery().subscribe(res => {
      this.deliveryList = res;
    });
  }
  initForm(): FormGroup {
    const d = this.fb.group({
     // delivery_man: [0, [Validators.required, Validators.min(1)]],
      item: [undefined, [Validators.required, Validators.min(1)]],
      pay_code: ['', [Validators.minLength(1), Validators.maxLength(4)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      paymentMethod: ['', [Validators.required, Validators.minLength(2)]],
      // client: [undefined, Validators.required, Validators.min(1)]
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  clearCode(){
    this.dataForm.patchValue({pay_code:''});
  }
  sendData() {
    this.sending = true;
    if(this.dataForm.value.pay_code.length < 1 && this.dataForm.value.paymentMethod !== this.methods.Cash){
      this.error = "Debes proveer una referencia de pago";
      this.sending = false;
      return;
    }
    let tmpList: any[] = [];
    this.selectedItems.forEach(e => {
      tmpList.push({
        id: e.id,
        quantity: e.quantity
      });
    });
    let Data: any = {
      items: tmpList,
      table: this.data.id,
      //delivery_man: this.dataForm.value.delivery_man,
      paymentMethod: this.dataForm.value.paymentMethod,
      // client: this.dataForm.value.client,
      pay_code: this.dataForm.value.paymentMethod  === this.methods.Cash ? [] : [this.dataForm.value.pay_code],
    };
    
    this.salesService.createSale(Data).pipe(
      catchError(err => {
        this.sending = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al Crear la venta';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.total = 0;
      this.subtotal = 0;
      this.emitForm.emit(Data);
      this.dataForm.reset();
      this.selectedItems = [];
      this.sending = false;
    });

  }

}
