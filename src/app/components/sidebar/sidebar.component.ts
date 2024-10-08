import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../interfaces';
import { Router, RouterModule } from '@angular/router';
import { ErrorStatus, Rol } from '../../constants/Enum';
import { catchError, throwError } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
declare var window: any;
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [DialogComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<{ screenWidth: number, collapsed: boolean }> = new EventEmitter();
  @ViewChild('closeButton') buttonToBeClicked: ElementRef;
  authService = inject(AuthService);
  router = inject(Router);
  ADMIN = Rol.ADMIN;
  dialog: any;
  rol = '';
  isHidden = false;
  public userData!: IUser;
  public emitLogout(data: any) {
    this.dialog.hide();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
  public getModuleName(): string {
    return this.authService?.getModuleName()?.toUpperCase();
  }
  closeSidebar(){
    this.buttonToBeClicked.nativeElement.click();
  }

  getRol() {
    return this.authService.currentUser()?.roles[0];
  }

  public getUserInfo(): string {
    return `${this.authService.currentUser()?.firstname?.at(0)} ${this.authService.currentUser()?.lastname?.at(0)}`
  }

  public getUserFullaname(): string | undefined {
    const fullname = this.authService.currentUser()?.firstname ? `${this.authService.currentUser()?.firstname} ${this.authService.currentUser()?.lastname}` : undefined;
    return fullname;
  }

  ngOnInit(): void {
    if (this.authService.currentUser()?.roles?.includes('cashier')) {
      this.navData = [
        {
          number: '1',
          routeLink: 'dashboard',
          icon: 'fa-solid fa-chart-line',
          label: 'Panel de Inicio',
          roles: ['admin', 'gerente', 'cashier', 'cliente']
        },

        {
          number: '2',
          routeLink: 'sales',
          icon: 'fa-solid fa-money-check-dollar',
          label: 'Pedidos',
          roles: ['admin', 'gerente', 'cashier', 'cliente']
        },
        {
          number: '3',
          routeLink: 'products',
          icon: 'fa-solid fa-list',
          label: 'Productos',
          roles: ['admin', 'gerente', 'cashier']
        },
      ];
      this.userData = {
        firstname: this.authService.currentUser()?.firstname,
        lastname: this.authService.currentUser()?.lastname,
        birthdate: this.authService.currentUser()?.birthdate,
        email: this.authService.currentUser()?.email,
        roles: this.authService.currentUser()?.roles,
        phone: this.authService.currentUser()?.phone,
        dni: this.authService.currentUser()?.dni,
        gender: this.authService.currentUser()?.gender
      }
    }
    this.authService?.getInfo().pipe(
      catchError(err => {
        if (err?.error?.message === ErrorStatus.NO_NETWORK || err?.error?.message === ErrorStatus.NO_FETCH) {
          alert("No hay conexión con el servidor se cerrara la sesión");
          this.autoLogout();
        }
        return throwError(() => err);
      })
    ).subscribe(info => {
      this.rol = info.roles[0];
    });
  }

  collapsed = false;
  navData = [
    {
      number: '0',
      routeLink: 'clients',
      icon: 'fa-solid fa-users',
      label: 'Clientes',
      roles: ['admin', 'gerente']
    },
    {
      number: '1',
      routeLink: 'orders',
      icon: 'fa-solid fa-basket-shopping',
      label: 'Compras',
      roles: ['admin', 'gerente']
    },
    {
      number: '2',
      routeLink: 'users',
      icon: 'fa-solid fa-user-tie',
      label: 'Empleados',
      roles: ['admin', 'gerente']
    },
    {
      number: '3',
      routeLink: 'tables',
      icon: 'fa-solid fa-chair',
      label: 'Mesas',
      roles: ['admin', 'gerente', 'cajero']
    },

    {
      number: '3',
      routeLink: 'sales',
      icon: 'fa-solid fa-money-check-dollar',
      label: 'Pedidos',
      roles: ['admin', 'gerente', 'cajero', 'cliente', 'repartidor']
    },
    {
      number: '4',
      routeLink: 'products',
      icon: 'fa-solid fa-ice-cream',
      label: 'Productos',
      roles: ['admin', 'gerente', 'cajero']
    },
    {
      number: '4',
      routeLink: 'complaints',
      icon: 'fa-solid fa-circle-exclamation',
      label: 'Recomendaciones',
      roles: ['admin', 'gerente', 'cliente']
    },
    {
      number: '5',
      routeLink: 'reports',
      icon: 'fa-solid fa-file-invoice',
      label: 'Reportes',
      roles: ['admin', 'gerente']
    },



    {
      number: '6',
      routeLink: 'dashboard',
      icon: 'fa-solid fa-chart-line',
      label: 'Visión General',
      roles: ['admin', 'gerente', 'cashier']
    },
  ];

  navData2 = [
    {
      number: '1',
      routeLink: 'dashboard',
      icon: 'fa-solid fa-chart-line',
      label: 'Panel de Inicio',
      roles: ['admin', 'gerente', 'cashier', 'cliente']
    },

    {
      number: '2',
      routeLink: 'sales',
      icon: 'fa-solid fa-money-check-dollar',
      label: 'Pedidos',
      roles: ['admin', 'gerente', 'cashier', 'cliente']
    },
    {
      number: '3',
      routeLink: 'products',
      icon: 'fa-solid fa-list',
      label: 'Productos',
      roles: ['admin', 'gerente', 'cashier']
    },
  ];

  status: boolean = true;
  screenWidth: number = 0;
  toggle() {
    this.status = !this.status;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  closeSidenav() {
    this.status = false;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

  }

  logout() {
    this.dialog = new window.bootstrap.Modal(
      document.getElementById("logoutDialog")
    );
    this.dialog.show();
  }
  autoLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
