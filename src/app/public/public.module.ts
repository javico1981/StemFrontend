
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { RegistroComponent } from './registro/registro.component';
import { publicRoutes } from './public.routing';
import { PublicComponent } from './public.component';


@NgModule({
    declarations: [
        PublicComponent,
        LoginComponent,
        RegistroComponent,
        EncuestaComponent
    ],
    imports: [
        RouterModule.forChild(publicRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatRadioModule,
        MatSelectModule,
        MatRippleModule,
        RouterModule,
        MatToolbarModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatIconModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
  
})
export class PublicModule { }
