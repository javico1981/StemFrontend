import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import { Encuesta } from 'app/table-list/model/encuesta.model';
import { CommonService } from 'app/services/common-service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {


 
  pregunta1LabelsVista = [];
  pregunta2LabelsVista = [];
  pregunta3LabelsVista = [];
  pregunta4LabelsVista = [];
  pregunta5LabelsVista = [];
  pregunta6LabelsVista = [];
  pregunta7LabelsVista = [];
  pregunta9LabelsVista = [];

  encuestas$: Observable<Encuesta[]>;
  dashboard$: Observable<any>;
  contagioRecienteIndex = 0;
  idContagioMenor: number;
  encuestas: Encuesta[] = [];
  dashboard: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _commonService: CommonService) {
  }

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

    this.encuestas$ = this._commonService.encuestas$;
    this._commonService.encuestas$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((encuestas: Encuesta[]) => {
            // Update the counts
            this.encuestas = encuestas;
        });


    this.dashboard$ = this._commonService.dashboard$;
    this._commonService.dashboard$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((dashboard: any) => {
            // Update the counts
            this.dashboard = dashboard;

        
        });


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
      /* ----------==========     Pregunta1   ==========---------- */

      this.pregunta1LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta1.labels);
      
          var dataPregunta1Chart = {
          labels: this.pregunta1LabelsVista,
          series: [
          this.dashboard.pregunta1.series]
      };
        var optionsPregunta1Chart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: Math.max(...this.dashboard.pregunta1.series) + 2,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };

      /* ----------==========     Pregunta2   ==========---------- */

      this.pregunta2LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta2.labels);
      
          var dataPregunta2Chart = {
          labels: this.pregunta2LabelsVista,
          series: [
          this.dashboard.pregunta2.series]
      };
        var optionsPregunta2Chart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: Math.max(...this.dashboard.pregunta2.series) + 2,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };


      /* ----------==========     Pregunta3   ==========---------- */

      this.pregunta3LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta3.labels);
      
          var dataPregunta3Chart = {
          labels: this.pregunta3LabelsVista,
          series: [
          this.dashboard.pregunta3.series]
      };
        var optionsPregunta3Chart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: Math.max(...this.dashboard.pregunta3.series) + 2,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };

      /* ----------==========     Pregunta4   ==========---------- */

      this.pregunta4LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta4.labels);
      
          var dataPregunta4Chart = {
          labels: this.pregunta4LabelsVista,
          series: [
          this.dashboard.pregunta4.series]
      };
        var optionsPregunta4Chart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: Math.max(...this.dashboard.pregunta4.series) + 2,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
    
      /* ----------==========     Pregunta5   ==========---------- */

        this.pregunta5LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta5.labels);
        
            var dataPregunta5Chart = {
            labels: this.pregunta5LabelsVista,
            series: [
            this.dashboard.pregunta5.series]
        };
          var optionsPregunta5Chart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: Math.max(...this.dashboard.pregunta5.series) + 2,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };

       /* ----------==========     Pregunta6   ==========---------- */

            this.pregunta6LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta6.labels);
            
            var dataPregunta6Chart = {
            labels: this.pregunta6LabelsVista,
            series: [
            this.dashboard.pregunta6.series]
        };
          var optionsPregunta6Chart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: Math.max(...this.dashboard.pregunta6.series) + 2,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };

    /* ----------==========     Pregunta7   ==========---------- */

          this.pregunta7LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta7.labels);
          
          var dataPregunta7Chart = {
          labels: this.pregunta7LabelsVista,
          series: [
          this.dashboard.pregunta7.series]
      };
        var optionsPregunta7Chart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: Math.max(...this.dashboard.pregunta7.series) + 2,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };

   /* ----------==========     Pregunta9   ==========---------- */

        this.pregunta9LabelsVista = this.calcularOpcionesVista(this.dashboard.pregunta9.labels);
            
        var dataPregunta9Chart = {
        labels: this.pregunta9LabelsVista,
        series: [
        this.dashboard.pregunta9.series]
      };
      var optionsPregunta9Chart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: Math.max(...this.dashboard.pregunta9.series) + 2,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };

    








    

    var pregunta1Chart = new Chartist.Bar('#pregunta1Chart', dataPregunta1Chart, optionsPregunta1Chart, responsiveOptions);
    var pregunta2Chart = new Chartist.Bar('#pregunta2Chart', dataPregunta2Chart, optionsPregunta2Chart, responsiveOptions);
    var pregunta3Chart = new Chartist.Bar('#pregunta3Chart', dataPregunta3Chart, optionsPregunta3Chart, responsiveOptions);
    var pregunta4Chart = new Chartist.Bar('#pregunta4Chart', dataPregunta4Chart, optionsPregunta4Chart, responsiveOptions);
    var pregunta5Chart = new Chartist.Bar('#pregunta5Chart', dataPregunta5Chart, optionsPregunta5Chart, responsiveOptions);
    var pregunta6Chart = new Chartist.Bar('#pregunta6Chart', dataPregunta6Chart, optionsPregunta6Chart, responsiveOptions);
    var pregunta7Chart = new Chartist.Bar('#pregunta7Chart', dataPregunta7Chart, optionsPregunta7Chart, responsiveOptions);
    var pregunta9Chart = new Chartist.Bar('#pregunta9Chart', dataPregunta9Chart, optionsPregunta9Chart, responsiveOptions);
    this.startAnimationForBarChart(pregunta1Chart);
    this.startAnimationForBarChart(pregunta2Chart);
    this.startAnimationForBarChart(pregunta3Chart);
    this.startAnimationForBarChart(pregunta4Chart);
    this.startAnimationForBarChart(pregunta5Chart);
    this.startAnimationForBarChart(pregunta6Chart);
    this.startAnimationForBarChart(pregunta7Chart);
    this.startAnimationForBarChart(pregunta9Chart);

    
  }

  calcularOpcionesVista(lista): string[] {

    let count = 1
    let newArray = []
    lista.forEach(element => {
      newArray.push(`Opcion ${count}`)
      count = count + 1
    });

    return newArray;

  }

  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
