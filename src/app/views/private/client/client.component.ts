import { ClientService } from '../../../services/client.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../components/table/table.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HeaderComponent, FormsModule, TableComponent, ModalComponent,DatePipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export default class ClientComponent {
  userService = inject(ClientService);
  authService = inject(AuthService);
  router = inject(Router);
  loading:boolean = false;
  error:string = "";
  userData: any[] = [];
  datepipe = new DatePipe('en-US');
  ngOnInit() {
    this.authService.setModuleName('Clientes');    
    this.loadData();
  }

  calculateAge(dateString) { // birthday is a date
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  loadData() {
    this.loading = true;
    this.userService.getAll().pipe(
      catchError(err => {
        this.loading = false;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al obtener las recomendaciones/reclamos';
        }
        return throwError(() => err);
      })
    ).subscribe((res) => {
      
      res.forEach((u) => {
        u.idd = u.id < 10 ? `#0${u.id}` : `#${u.id}`;
        u.age = `${u.birthdate} (${this.calculateAge(u.birthdate)} años)`
      });
      this.userData = res;
      this.loading = false;
    });

  }

  public search: string = '';
  columnNames = ['nombre', 'apellido', 'correo', 'cédula', 'fecha de nacimieto','genero', 'teléfono']
  columns = ['firstname', 'lastname', 'email', 'dni', 'age','gender', 'phone']
  op = { delete: true, edit: true }

  editUser(user: any) {

    user.age = `${user.birthdate} (${this.calculateAge(user.birthdate)} años)`
    this.loadData();
  }

  deleteUser(user: any) {
    this.userService.delete(user.id).subscribe(() => {
      this.userData = [];
      this.loadData();
    });
  }

  newValue(user: any) {
    user.age = `${user.birthdate} (${this.calculateAge(user.birthdate)} años)`
    // this.userData.push(user);
    this.loadData();
  }
}
