import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonService } from 'app/services/common-service';
import { User } from './model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'app/auth/aut.service';
import { takeUntil } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  userData: any;
  usuarios$: Observable<User[]>;
  type = ['','info','success','warning','danger'];
  usuarios: User[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _commonService: CommonService, private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _authService: AuthService) {
  }

  ngOnInit() {

    this.userData = this._authService.getUserData();

    this.usuarios$ = this._commonService.usuarios$;
    this._commonService.usuarios$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((usuarios: User[]) => {
            // Update the counts
            this.usuarios = usuarios;

            this._changeDetectorRef.markForCheck();
        });
  }


  openModal(tipo: 'editar' | 'crear', user?: User): void {

      let informacion = {
        tipo: tipo,
        paciente: user
      }

      const dialogRef = this._matDialog.open(ModalFormComponent, {
        data: informacion
    });

    dialogRef.afterClosed()
    .subscribe(result => {

      if (result) {
          tipo === 'editar' ? this.editarUsuario(result):  this.crearUsuario(result)
      }
    });

  }


  

  crearUsuario(user): void {

    const data = user;
    
    this._commonService.postUsuario(data).then((res) => {

      if (!res.errors) {
        this._commonService.getUsuarios().subscribe();
        this.showNotification('success', 'Usuario creado')
      }else {
        this.showNotification('danger', 'El correo ya esta registrado')
      }
    })

    
  }

  editarUsuario(user): void {

    const data = user;
    

    this._commonService.putUsuario(data).then((res) => {

      if (!res.errors) {
        this._commonService.getUsuarios().subscribe();
        this.showNotification('success', 'Usuario editado')
      }else {
        this.showNotification('danger', 'El correo ya esta registrado')
      }

    })

  }

  eliminarUsuario(user): void {

  
    this._commonService.deleteUsuario(user.id).then((res) => {

      if (!res.errors) {
        this._commonService.getUsuarios().subscribe();
        this.showNotification('success', 'Usuario eliminado')
      }else {
        this.showNotification('danger', 'Hubo un fallo al guardar')
      }

  
    })

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

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


  

}
