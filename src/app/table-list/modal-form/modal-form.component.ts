import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Paciente } from '../model/paciente.model';
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


    maxDate = new Date();
    tipo = ''
    pacienteForm: FormGroup;
    paciente: Paciente | null;

    generos = ['Femenino', 'Masculino'];
    nivelesEducativos = ['Primaria', 'Bachiller', 'Universitario', 'Otro']
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<ModalFormComponent>) { 

        console.log('data en el modal', data);
        this.paciente = data.paciente;
        this.tipo = data.tipo;
    }


    ngOnInit() {

        this.pacienteForm = this._formBuilder.group({
            id: [null],
            nombre: [null, [Validators.minLength(6), Validators.maxLength(100), Validators.required]],
            edad: [null, [Validators.min(1), Validators.max(100), Validators.required]],
            genero: [null, [Validators.required]],
            nivel_educativo: [null, [Validators.required]],
            fecha_contagio: [null, [Validators.required]],
            created_by: [null],
            updated_by: [null],
        })


        if (this.tipo === 'editar') {
            this.pacienteForm.patchValue(this.paciente);
        }

    }

}
