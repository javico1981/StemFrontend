import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'app/table-list/model/paciente.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {


  urlLocal= '/api/'

  private _pacientes: BehaviorSubject<Paciente[] | null> = new BehaviorSubject(null);

  constructor(private _router: Router, private _httpClient: HttpClient) { }


  get pacientes$(): Observable<Paciente[]>
     {
         return this._pacientes.asObservable();
     }

  getPacientes():  Observable<Paciente[]> {

    return  this._httpClient.get<Paciente[]>(`${this.urlLocal}paciente`).pipe(
      tap((pacientes) => {
          this._pacientes.next(pacientes);
      })
  );
         
   
  }

  postPaciente(form): Promise<any>
    {

      return new Promise((resolve, reject) => {
          this._httpClient.post(`${this.urlLocal}paciente`, form)
              .subscribe((response: any) => {
                
                  resolve(response);
              }, reject);
      });

    }

  putPaciente(form): Promise<any>
    {
  
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${this.urlLocal}paciente/${form.id}`, form)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
        });

    }


    deletePaciente(id): Promise<any>
    {
     
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.urlLocal}paciente/${id}`)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
      });  
  }
}