import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { Paciente } from 'app/table-list/model/paciente.model';
import { CommonService } from 'app/services/common-service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {


  pacientes$: Observable<Paciente[]>;

  porcentajeHombres: number;
  porcentajeHombresCantidad: number;
  porcentajeMujeres: number;
  porcentajeMujeresCantidad: number;

  porcentajePrimaria: number;
  porcentajePrimariaCantidad: number;
  porcentajeBachiller: number;
  porcentajeBachillerCantidad: number;
  porcentajeUniversitario: number;
  porcentajeUniversitarioCantidad: number;
  porcentajeOtro: number;
  porcentajeOtroCantidad: number;

  labelsPorMes = [];
  seriesPorMes = [];

  seriesPorGenero: number[] = [];
  seriesPorNivelEducativo: number[] = [];


  hoy = moment();
  contagioRecienteIndex = 0;
  idContagioMenor: number;
  pacientes: Paciente[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _commonService: CommonService) {
  }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {

    this.pacientes$ = this._commonService.pacientes$;
    this._commonService.pacientes$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((pacientes: Paciente[]) => {
            // Update the counts
            this.pacientes = pacientes;

        
        });

//     
      this.idContagioMenor = this.calcularContagioMasActual()
      this.contagioRecienteIndex = this.pacientes.findIndex(x => x.id === this.idContagioMenor);
      
      this.calcularPorcentajes();
      

      this.pacientes.forEach(x => {

        let mes = moment(x.fecha_contagio).format('MMM')

        if (!this.labelsPorMes.includes(mes)) {
            this.labelsPorMes.push(mes);
        }    

      })

      this.labelsPorMes.sort((a, b) => moment(a, 'MMM').diff(moment(b, 'MMM')))


      this.pacientes.forEach(x => {

        let mes = moment(x.fecha_contagio).format('MMM');

        let indexMes = this.labelsPorMes.findIndex(x => x === mes);


        if (!this.seriesPorMes[indexMes]) {
          this.seriesPorMes[indexMes] = 0;
        }

     
        this.seriesPorMes[indexMes]  = this.seriesPorMes[indexMes]+ 1;

      })

    
    
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: this.labelsPorMes,
          series: [
            this.seriesPorMes
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 12, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      this.seriesPorNivelEducativo[0] = this.pacientes.filter(x =>  x.nivel_educativo === 'Primaria').length;
      this.seriesPorNivelEducativo[1] = this.pacientes.filter(x =>  x.nivel_educativo === 'Bachiller').length;
      this.seriesPorNivelEducativo[2] = this.pacientes.filter(x =>  x.nivel_educativo === 'Universitario').length;
      this.seriesPorNivelEducativo[3] = this.pacientes.filter(x =>  x.nivel_educativo === 'Otro').length;
    



      var dataNivelEducativoChart = {
        labels: ['Primaria', 'Bachiller', 'Universitario', 'Otro'],
        series: [
          this.seriesPorNivelEducativo

        ]
      };
    
      var optionsNivelEducativoChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: Math.max(...this.seriesPorNivelEducativo) + 2,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var nivelEducativoChart = new Chartist.Bar('#nivelEducativoChart', dataNivelEducativoChart, optionsNivelEducativoChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(nivelEducativoChart);



      this.seriesPorGenero[0] = this.pacientes.filter(x =>  x.genero === 'Masculino').length;
      this.seriesPorGenero[1] = this.pacientes.filter(x =>  x.genero === 'Femenino').length;

      
      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['Masculino', 'Femenino'],
        series: [
          this.seriesPorGenero

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: Math.max(...this.seriesPorGenero) + 2,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

  calcularContagioMasActual(): number {

    let diferencias = [];

    this.pacientes.forEach(x => {
        diferencias.push({ diff: moment(x.fecha_contagio, ['YYYY-MM-DD']).diff(this.hoy), id: x.id})
    });

    if (diferencias.find(x => x.diff === Math.max.apply(Math, diferencias.map(o => o.diff)))) {
      return diferencias.find(x => x.diff === Math.max.apply(Math, diferencias.map(o => o.diff))).id;
    } else {
      return null;
    }

    
  }

  calcularPorcentajes(): void {
    this.porcentajeHombres = this.pacientes.filter(x =>  x.genero === 'Masculino').length / this.pacientes.length * 100;
    this.porcentajeHombresCantidad = this.pacientes.filter(x =>  x.genero === 'Masculino').length;

    this.porcentajeMujeres = this.pacientes.filter(x => x.genero === 'Femenino').length / this.pacientes.length * 100;
    this.porcentajeMujeresCantidad = this.pacientes.filter(x => x.genero === 'Femenino').length;

    this.porcentajePrimaria = this.pacientes.filter(x => x.nivel_educativo === 'Primaria').length / this.pacientes.length * 100;
    this.porcentajePrimariaCantidad = this.pacientes.filter(x => x.nivel_educativo === 'Primaria').length;
    this.porcentajeBachiller = this.pacientes.filter(x => x.nivel_educativo === 'Bachiller').length / this.pacientes.length * 100;
    this.porcentajeBachillerCantidad = this.pacientes.filter(x => x.nivel_educativo === 'Bachiller').length;
    this.porcentajeUniversitario = this.pacientes.filter(x =>  x.nivel_educativo === 'Universitario').length / this.pacientes.length * 100;
    this.porcentajeUniversitarioCantidad = this.pacientes.filter(x =>  x.nivel_educativo === 'Universitario').length;
    this.porcentajeOtro = this.pacientes.filter(x => x.nivel_educativo === 'Otro').length / this.pacientes.length * 100;
    this.porcentajeOtroCantidad = this.pacientes.filter(x => x.nivel_educativo === 'Otro').length;

  }

  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
