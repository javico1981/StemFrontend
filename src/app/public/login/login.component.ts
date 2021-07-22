import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/aut.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;
    loginForm: FormGroup;
    type = ['','info','success','warning','danger'];

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router ) { }

    ngOnInit() {
        this.loginForm = this._formBuilder.group({
            
            email: [null, [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
            password: [null, [Validators.minLength(6), Validators.maxLength(100), Validators.required]]
            
        })
    }

    onSubmitForm(form): void {

        const data = form;
        data.password = window.btoa(form.email + ':' + form.password);
        
        this.loading = true;
        this._authService.logear(data).then((res) => {
            if (res.logeado) {
                this._router.navigate(['/app/dashboard'])
            }else {
                this.showNotification('danger', 'El email o la contraseña no son validos')
            }
            this.loading = false;
        });
    }


    showNotification(tipo, mensaje){
    
        $.notify({
            icon: "notifications",
            message: mensaje
  
        },{
            type: tipo,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

}
