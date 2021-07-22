import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {AdminLayoutComponent } from './admin-layout.component';
import { ComponentsModule } from 'app/components/components.module';
import { ModalFormComponent } from 'app/table-list/modal-form/modal-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatTooltipModule,
    HttpClientModule,
    MatDialogModule,
    ComponentsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    AdminLayoutComponent,
    ModalFormComponent
  ],
  providers   : [
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
        provide : MAT_DATE_FORMATS,
        useValue: {
            parse  : {
                dateInput: 'DD/MM/YYYY'
            },
            display: {
                dateInput         : 'DD/MM/YYYY',
                monthYearLabel    : 'MMM YYYY',
                dateA11yLabel     : 'DD/MM/YYYY',
                monthYearA11yLabel: 'MMMM YYYY'
            }
        }
    },
    { provide: LOCALE_ID, useValue: 'es-CO'},
]
})

export class AdminLayoutModule {}
