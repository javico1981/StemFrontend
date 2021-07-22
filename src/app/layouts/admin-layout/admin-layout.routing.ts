import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { EncuestasResolver, DashboardResolver, UsuariosResolver } from '../../services/common.resolve';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { UserListComponent } from 'app/user-list/user-list.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminGuard } from 'app/shared/guards/admin-guard.guard';

export const AdminLayoutRoutes: Routes = [
    {   path: '',
        component: AdminLayoutComponent,
        children: [
            {   path: 'dashboard',      component: DashboardComponent, 
                resolve:  {
                    encuestas: EncuestasResolver,
                    dashboard: DashboardResolver
                }
            },
            { path: 'user-profile',   component: UserProfileComponent },
            { path: 'table-list',     component: TableListComponent,
                resolve:  {
                    encuestas: EncuestasResolver
                } 
            },
            {
                path: 'user-list', component: UserListComponent,
                canActivate: [AdminGuard],
                resolve: {
                    usuarios: UsuariosResolver
                }
            }
        ]

    },
   

    
];
