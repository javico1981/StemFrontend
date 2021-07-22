import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'modal-detalle',
    templateUrl: './modal-detalle.component.html',
    styleUrls: ['./modal-detalle.component.css']
    
  })
  export class ModalDetalleComponent {
  
    preguntas =  [
        '¿Tu relación con las STEM en la actualidad es?',
        'Si estas estudiando o has culminado tus estudios en STEM, ¿Con cuál o cuáles de las siguientes áreas de conocimiento estas más alineada?',
        'Si has culminado tus estudios, ¿cuál es tu situación actualmente?',
        'Si estas trabajando, ¿Tu trabajo actual esta relacionado con lo que estudiaste?',
        'Si estas trabajando, tu trabajo actual esta más relacionado con que área de la empresa',
        '¿Te gustaría ser parte de una comunidad de mujeres en STEM en el Ecuador? ',
        '¿Qué beneficios consideras que deberia tener la comunidad para que sea atractiva para ti?',
        'Si te interesa ser parte de la comunidad mujeres STEM en Ecuador, compártenos tu correo electrónico',
        'Ciudad donde ubicas principalmente',
    ]


    constructor(
      public dialogRef: MatDialogRef<ModalDetalleComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }