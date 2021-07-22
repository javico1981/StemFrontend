import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/aut.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

    isLogged = false;

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

    opcionesPregunta1 = [
        'Estas emprendiendo en una área STEM',
        'Estas estudiando una carrera STEM',
        'Estas trabajando en una área STEM',
        'He estudiado una carrera STEM',
        'Voluntariado',
        'He investigado en una oportunidad el tema',
        'Me gustaría trabajar en un área STEM',
        'Te gustaría estudiar una carrera STEM'
    ]

    opcionesPregunta2 = [
        'Agricultura',
        'Agronomía',
        'Artes',
        'Biología',
        'Biotecnología',
        'Comunicación digital y Tics ',
        'Electrónica',
        'Matemáticas',
        'Desarrollo',
        'Sistemas',
    ]

    opcionesPregunta3 = [
        'Ama de casa',
        'Buscando trabajo',
        'Investigadora',
        'Tengo un negocio propio (Emprendedora)',
        'Docente universitaria',
        'Docente secundaria',
        'Docente primaria',
        'Trabajando sector privado',
        'Desarrollo',
        'Sistemas',
    ]

    opcionesPregunta5 = [
        'Academia (docencia)',
        'Investigación',
        'Área administrativa o de gestión',
        'Área Operativa',
        'Área Docente',
        'Área Gerencial',
        'Ventas',
    ]

    opcionesPregunta6 = [
        'No',
        'No estoy segura',
        'Sí',
        'Si me gustaria pero yo soy un Hombre',
    ]

    opcionesPregunta7 = [
        'Capacitación',
        'Compartir información de interés (noticias, empleos, otras)',
        'Espacios físicos o virtuales para compartir experiencias',
        'oportunidades',
        'Innovación digital para dar a conocer mas la red',
        'Formación específica en áreas relacionadas con las STEM',
        'Compartir oportunidades de trabajo',
        'Creación de redes de intercambio, apoyo y aceleración',
        'Fomentar  alianzas con la empresa privada',
        'Oportunidades de emprender',
    ]

    opcionesPregunta9 = [
        'Ambato',
        'Atuntaqui',
        'Cayambe',
        'Cuenca',
        'Guayaquil',
        'Ibarra',
        'Quito',
        'Riobamba',
        'Santa Elena',
        'Tulcan',
        'Zaragoza',
    ]

    loading = false;
    encuestaForm: FormGroup;
    type = ['','info','success','warning','danger'];

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router ) { }

    ngOnInit() {

        this.isLogged = this._authService.isLogged();

        this.encuestaForm = this._formBuilder.group({
            pregunta_1: [null, [Validators.required]],
            pregunta_2: [null],
            pregunta_3: [null],
            pregunta_4: [null],
            pregunta_5: [null],
            pregunta_6: [null, [Validators.required]],
            pregunta_7: [null, [Validators.required]],
            pregunta_8: [null, [Validators.email]],
            pregunta_9: [null, [Validators.required]],
        })
    }

    resetForm(): void {

        this.encuestaForm.reset();
        this.encuestaForm.markAsUntouched();

    }

    onSubmitForm(form): void {

      
        const data = form;


        if (data.pregunta_2 && data.pregunta_2.length === 0) {
            data.pregunta_2 === null;
        }

        if (data.pregunta_3 && data.pregunta_3.length === 0) {
            data.pregunta_3 === null;
        }

        if (data.pregunta_5 && data.pregunta_5.length === 0) {
            data.pregunta_5 === null;
        }

        return

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
