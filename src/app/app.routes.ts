import { Routes } from '@angular/router';
import { LoginComponent } from './views/public/login/login.component';
import { PrivatelayoutComponent } from './views/private/privatelayout/privatelayout.component';
import { NotfoundComponent } from './views/public/notfound/notfound.component';
import { PasswordComponent } from './views/public/password/password.component';
import { Rol } from './constants/Enum';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [authGuard] },
    {
        path: '',
        component: PrivatelayoutComponent,
        children: [
            { path: 'dashboard', loadComponent: () => import('./views/private/dashboard/dashboard.component')},
            { path: 'users', loadComponent: () => import('./views/private/user/user.component'),canActivate: [authGuard], data: { roles: [Rol.ADMIN, Rol.MANAGER] } },
            { path: 'clients', loadComponent: () => import('./views/private/client/client.component'),canActivate: [authGuard], data: { roles: [Rol.ADMIN, Rol.MANAGER, Rol.CASHIER] }  },
            { path: 'complaints', loadComponent: () => import('./views/private/complaint/complaint.component') },
            { path: 'tables', loadComponent: () => import('./views/private/tables/tables.component'),canActivate: [authGuard], data: { roles: [Rol.ADMIN, Rol.MANAGER, Rol.CASHIER] }  },
            { path: 'sales', loadComponent: () => import('./views/private/sale/sale.component') },
            { path: 'orders', loadComponent: () => import('./views/private/order/order.component'),canActivate: [authGuard], data: { roles: [Rol.ADMIN, Rol.MANAGER] } },
            { path: 'products', loadComponent: () => import('./views/private/product/product.component'),canActivate: [authGuard], data: { roles: [Rol.ADMIN, Rol.MANAGER, Rol.CASHIER] } },
            { path: 'reports', loadComponent: () => import('./views/private/report/report.component'),canActivate: [authGuard], data: { roles: [Rol.ADMIN, Rol.MANAGER, Rol.CASHIER] } },
            { path: 'edituser', loadComponent: () => import('./views/private/edituser/edituser.component') },
        ]
    },
    { path: 'password', component: PasswordComponent},
    { path: '**', pathMatch: 'full', component: NotfoundComponent}
];
