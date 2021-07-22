import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CommonResolver } from '../../services/common.resolve';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    {   path: '',
        component: AdminLayoutComponent,
        children: [
            {   path: 'dashboard',      component: DashboardComponent, 
                resolve:  {
                    pacientes: CommonResolver
                }
            },
            { path: 'user-profile',   component: UserProfileComponent },
            { path: 'table-list',     component: TableListComponent,
                resolve:  {
                    pacientes: CommonResolver
                } 
            },
        ]

    },
   

    
];
