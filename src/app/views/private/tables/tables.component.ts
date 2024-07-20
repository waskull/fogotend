import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { TableComponent } from '../../../components/table/table.component';
import { TablesService } from '../../../services/tables.service';
import { DatePipe } from '@angular/common';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { TablesaleformComponent } from '../../../components/tablesaleform/tablesaleform.component';
import { AuthService } from '../../../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DialogComponent } from '../../../components/dialog/dialog.component';
declare var window: any;

@Component({
  selector: 'tables',
  standalone: true,
  imports: [ModalComponent, HeaderComponent, TableComponent, DatePipe, FormsModule, DialogComponent,
    FilterPipe,TablesaleformComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export default class TablesComponent {
  baseURL:string = environment.baseURL;
  columnNames = ['idd', 'nombre', 'capacidad', 'disponibilidad']
  columns = ['idd', 'name', 'capacity', 'available'];
  op = { delete: false, edit: false, show: true }
  @Input() loading: boolean = false;
  error:string = '';
  tableList: any[] = [];
  tableService = inject(TablesService);
  datepipe = new DatePipe('en-US');
  @Input() operations: operations = { edit: false, delete: false, show: false };
  search:string = '';
  authService = inject(AuthService);
  ff: any;
  dialog: any;
  constructor() { }

  ngOnInit(): void {
    this.authService.setModuleName('Mesas');    
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.tableList = [];
    // this.tableService.getAll().subscribe(res => {
      
    //   this.loading = false;
    // });

    this.tableService.getAll().pipe(
      catchError(err => {
        this.loading = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al obtener las mesas';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.loading = false;
      res.forEach(e => {
        this.tableList.push({
          idd: e.id < 10 ? `#0${e.id}` : `#${e.id}`,
          name: e.name,
          id: e.id,
          capacity: e.capacity,
          sale: e?.sale,
          available: e.available
        });
      });
    });

  }
  edit(data: any) {
    this.ff.hide();
    this.loadData();
  }
  delete(data: any) {
    console.log(data);
  }
  newValue(data: any) {
    this.loadData();
  }
  // confirm({ id, delivery_man_id }: { id: number, delivery_man_id: number }) {
  //   this.tableService.completeSale(id, delivery_man_id).subscribe((res) => {
  //     this.loadData();
  //   });
  // }

  reload() {
    this.loadData();
  }
  clean(){
    this.search = '';
  }
  release(data: any){
    this.tableService.cancel(data.id).subscribe((res) => {
      this.dialog.hide();
      this.loadData();
    });
  }

  confirm(id:number){
    this.openDialog(id.toString());
  }
  openDialog(id: string) {
    this.dialog = new window.bootstrap.Modal(
      document.getElementById(id+"Table")
    );
    this.dialog.show();
  }
  show(id: number){
    this.ff = new window.bootstrap.Modal(
      document.getElementById(id.toString())
    );
    this.ff.show();
  }

  open(id: number) {
    this.ff = new window.bootstrap.Modal(
      document.getElementById('modal'+id.toString())
    );
    this.ff.show();
  }

  close(){
    this.ff.hide();
  }

  emitUser(data:any){
    this.loadData();
    this.ff.hide();
  }
}

interface operations {
  edit?: boolean,
  delete?: boolean,
  show?: boolean
};