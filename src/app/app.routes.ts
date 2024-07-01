import { Routes } from '@angular/router';
import { LoginComponent } from './views/public/login/login.component';
import { PrivatelayoutComponent } from './views/private/privatelayout/privatelayout.component';
import { NotfoundComponent } from './views/public/notfound/notfound.component';
import { PasswordComponent } from './views/public/password/password.component';
export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'password', component: PasswordComponent},
    {
        path: '',
        component: PrivatelayoutComponent,
        children: [
            { path: 'dashboard', loadComponent: () => import('./views/private/dashboard/dashboard.component')},
            { path: 'users', loadComponent: () => import('./views/private/user/user.component') },
            { path: 'clients', loadComponent: () => import('./views/private/client/client.component')  },
            { path: 'complaints', loadComponent: () => import('./views/private/complaint/complaint.component') },
            { path: 'tables', loadComponent: () => import('./views/private/tables/tables.component')  },
            { path: 'sales', loadComponent: () => import('./views/private/sale/sale.component') },
            { path: 'orders', loadComponent: () => import('./views/private/order/order.component') },
            { path: 'products', loadComponent: () => import('./views/private/product/product.component') },
            { path: 'stock', loadComponent: () => import('./views/private/inventory/inventory.component') },
            { path: 'reports', loadComponent: () => import('./views/private/report/report.component') },
            { path: 'edituser', loadComponent: () => import('./views/private/edituser/edituser.component') },
        ]
    },
    { path: '**', pathMatch: 'full', component: NotfoundComponent}
];
