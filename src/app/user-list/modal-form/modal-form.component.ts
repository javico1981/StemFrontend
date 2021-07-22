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

        console.log('data en el modal', data);
        this.usuario = data.user;
        this.tipo = data.tipo;
    }


    ngOnInit() {

        this.usuarioForm = this._formBuilder.group({
            id: [null],
            nombre: [null, [Validators.minLength(6), Validators.maxLength(100), Validators.required]],
            email: [null, [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
            password: [null, [Validators.minLength(6), Validators.maxLength(100), Validators.required]],
        })


        if (this.tipo === 'editar') {
            this.usuarioForm.patchValue(this.usuario);
        }

    }

}
