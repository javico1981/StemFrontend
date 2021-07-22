import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonService } from 'app/services/common-service';
import { Paciente } from './model/paciente.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'app/auth/aut.service';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnDestroy {

  userData: any;
  pacientes$: Observable<Paciente[]>;
  type = ['','info','success','warning','danger'];
  pacientes: Paciente[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _commonService: CommonService, private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _authService: AuthService) {
  }

  ngOnInit() {

    this.userData = this._authService.getUserData();

    this.pacientes$ = this._commonService.pacientes$;
    this._commonService.pacientes$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((pacientes: Paciente[]) => {
            // Update the counts
            this.pacientes = pacientes;

            this._changeDetectorRef.markForCheck();
        });
  }


  openModal(tipo: 'editar' | 'crear', paciente?: Paciente): void {

      let informacion = {
        tipo: tipo,
        paciente: paciente
      }

      const dialogRef = this._matDialog.open(ModalFormComponent, {
        data: informacion
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('lo que retorna el modal', result);

      if (result) {
          tipo === 'editar' ? this.editarPaciente(result):  this.crearPaciente(result)
      }
    });

  }


  

  crearPaciente(paciente): void {

    const data = paciente;
    data.fecha_contagio = moment(paciente.fecha_contagio).format('YYYY-MM-DD');
    data.created_by = this.userData.id;

    this._commonService.postPaciente(data).then((res) => {

      if (!res.errors) {
        this._commonService.getPacientes().subscribe();
        this.showNotification('success', 'Paciente creado')
      }else {
        this.showNotification('danger', 'Hubo un fallo al guardar')
      }
    })

    
  }

  editarPaciente(paciente): void {

    const data = paciente;
    data.fecha_contagio = moment(paciente.fecha_contagio).format('YYYY-MM-DD');
    data.updated_by = this.userData.id;

    this._commonService.putPaciente(data).then((res) => {

      if (!res.errors) {
        this._commonService.getPacientes().subscribe();
        this.showNotification('success', 'Paciente editado')
      }else {
        this.showNotification('danger', 'Hubo un fallo al guardar')
      }

    })

  }

  eliminarPaciente(paciente): void {

  
    this._commonService.deletePaciente(paciente.id).then((res) => {

      if (!res.errors) {
        this._commonService.getPacientes().subscribe();
        this.showNotification('success', 'Paciente eliminado')
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
