import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'modal-password',
    templateUrl: './modal-password.component.html',
    styleUrls: ['./modal-password.component.css']
    
  })
  export class ModalPasswordComponent implements OnInit {
  
    restoreForm: FormGroup;
    constructor(
      public dialogRef: MatDialogRef<ModalPasswordComponent>, private _formBuilder: FormBuilder) {

    }

    ngOnInit(): void {

      this.restoreForm = this._formBuilder.group({
            
        email: [null, [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        password: [null, [Validators.minLength(6), Validators.maxLength(100), Validators.required]]
        
    })

    }

    enviarData(form): void {
      const data = form;

      data.password = window.btoa(form.email + ':' + form.password);
      this.dialogRef.close(data)
    }
}