import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/aut.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loading = false;
  userForm: FormGroup;
  userData: any;
  type = ['','info','success','warning','danger'];

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.userData = this._authService.getUserData();

    this.userForm = this._formBuilder.group({
      id: [this.userData.id],
      email: [this.userData.email, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(100)]],
      password: [null, [Validators.minLength(6), Validators.maxLength(100)]],
      nombre: [this.userData.nombre, [Validators.required,Validators.minLength(6), Validators.maxLength(100)]],
      updated_by: [this.userData.id]
    })
  }

  onSubmitForm(form): void {
  
    const formData = form;

    if (formData.password === '' || formData.password === null) {
      formData.password === null
    }else {
      formData.password = window.btoa(form.email + ':' + form.password);
    }

    this.loading = true;
    
    this._authService.updateUserData(formData).then((res) => {

      if(!res.errors) {
        this.showNotification('success', 'Información actualizada')
        this.userData = this._authService.getUserData();
      } else {
        this.showNotification('danger', 'El correo a esta en uso');
        this.userForm.get('email').setValue(this.userData.email);
        this.userForm.get('email').updateValueAndValidity();

        this.userForm.get('nombre').setValue(this.userData.nombre);
        this.userForm.get('nombre').updateValueAndValidity();
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
