import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { User } from '../model/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFormComponent implements OnInit {

    tipo = ''
    usuarioForm: FormGroup;
    usuario: User | null;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<ModalFormComponent>) { 

        this.usuario = data.user;
        this.tipo = data.tipo;
    }


    ngOnInit() {

        this.usuarioForm = this._formBuilder.group({
            id: [null],
            nombre: [null, [Validators.minLength(6), Validators.maxLength(100), Validators.required]],
            email: [null, [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
            password: [null, [Validators.minLength(6), Validators.maxLength(100)]],
            tipo_usuario: [2]
        })


        if (this.tipo === 'editar') {
            this.usuarioForm.patchValue({nombre: this.usuario.nombre, email: this.usuario.email, id: this.usuario.id});
            this.usuarioForm.get('password').setValidators([Validators.minLength(6), Validators.maxLength(100)])
            this.usuarioForm.get('password').updateValueAndValidity();
        }else {
            this.usuarioForm.get('password').setValidators([Validators.minLength(6), Validators.maxLength(100), Validators.required])
            this.usuarioForm.get('password').updateValueAndValidity();
        }

    }

}
