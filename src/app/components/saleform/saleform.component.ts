import { Component, EventEmitter, Input, OnInit, Output, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Method, Rol } from '../../constants/Enum';
import { OnlynumbersDirective } from '../../onlynumbers.directive';
import { ProductService } from '../../services/product.service';
import { ClientService } from '../../services/client.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'saleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OnlynumbersDirective, NgSelectModule],
  templateUrl: './saleform.component.html',
  styleUrl: './saleform.component.scss'
})
export class SaleformComponent implements OnInit {
  constructor(private clipboard: Clipboard) {}
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  methods = Method;
  dataForm!: FormGroup;
  baseURL:string = environment.baseURL;
  editing: boolean = false;
  error: string = '';
  sending: boolean = false;
  clientList: any[] = [];
  inventoryList: any[] = [];
  deliveryList: any[] = [];
  selectedItems: any[] = [];
  total: number = 0;
  subtotal:number = 0;
  userService = inject(UserService);
  CASH = Method.Cash
  fb = inject(FormBuilder);
  
  productService = inject(ProductService);
  salesService = inject(SaleService);
  clientService = inject(ClientService);
  CLIENT = Rol.CLIENT;
  authService = inject(AuthService);
  
  getRol():string{
    return this.authService?.currentUser()?.roles[0];
  }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.loadFormData();
  }

  add(i:any){
    let item = this.inventoryList.find(x => x.id === i)
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
    this.total = this.subtotal;
    // this.selectedItems.forEach((e: { item: { price: string; wholesale_price:string }; quantity: string; }) => {
    //   if(this.subtotal>=10) {
    //     this.total += parseFloat(e.item.wholesale_price) * parseInt(e.quantity);
    //   }
    //   else{
    //     this.total += parseFloat(e.item.price) * parseInt(e.quantity);
    //   }
    // });
  }

  calculateDelivery():number{
    if(this.total < 30 ){return this.total+=4;}
    else if(this.total >= 30 && this.total<60){return this.total+=2;}
    else{return this.total}
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
      client: [undefined,[Validators.min(1)]],
      item: [undefined, [Validators.required, Validators.min(1)]],
      pay_code: ["", [Validators.minLength(1), Validators.maxLength(4)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      address: ["", [Validators.required, Validators.minLength(2)]],
      paymentMethod: ["", [Validators.required, Validators.minLength(5)]],
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
    this.error = "";
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
      //delivery_man: this.dataForm.value.delivery_man,
      paymentMethod: this.dataForm.value.paymentMethod,
      pay_code: this.dataForm.value.paymentMethod  === this.methods.Cash ? [] : [this.dataForm.value.pay_code],
      address: this.dataForm.value.address,
      user: this.getRol() !== this.CLIENT ? parseInt(this.dataForm.value.client) : undefined,
    };
    
    this.salesService.create(Data).pipe(
      catchError(err => {
        this.sending = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al crear el pedido';
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
