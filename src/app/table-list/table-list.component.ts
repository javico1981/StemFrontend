import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonService } from 'app/services/common-service';
import { MatDialog } from '@angular/material/dialog';
import { Encuesta } from './model/encuesta.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';

declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnDestroy {

  userData: any;
  encuestas$: Observable<Encuesta[]>;
  type = ['','info','success','warning','danger'];
  encuestas: Encuesta[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _commonService: CommonService, private _changeDetectorRef: ChangeDetectorRef, private _dialog: MatDialog) {
  }

  ngOnInit() {

    this.encuestas$ = this._commonService.encuestas$;
    this._commonService.encuestas$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((encuestas: Encuesta[]) => {
            // Update the counts
            this.encuestas = encuestas;
            this._changeDetectorRef.markForCheck();
        });
  }


  openModal(registro): void {

    const dialogRef = this._dialog.open(ModalDetalleComponent, {
      data: registro
    });

  }

  eliminarEncuesta(paciente): void {

  
    this._commonService.deleteEncuesta(paciente.id).then((res) => {

      if (!res.errors) {
        this._commonService.getEncuestas().subscribe();
        this.showNotification('success', 'Registro eliminado')
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
