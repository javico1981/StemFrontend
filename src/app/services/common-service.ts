import { Injectable } from '@angular/core';
import { Encuesta } from 'app/table-list/model/encuesta.model';
import { User } from 'app/user-list/model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {


  urlLocal= '/api/'

  private _encuestas: BehaviorSubject<Encuesta[] | null> = new BehaviorSubject(null);
  private _dashboard: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _usuarios: BehaviorSubject<User[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }


    get usuarios$(): Observable<User[]>
     {
         return this._usuarios.asObservable();
     }

    get encuestas$(): Observable<Encuesta[]>
    {
        return this._encuestas.asObservable();
    }



    get dashboard$(): Observable<any>
    {
        return this._dashboard.asObservable();
    }

  

  getEncuestas():  Observable<Encuesta[]> {

    return  this._httpClient.get<Encuesta[]>(`${this.urlLocal}encuesta`).pipe(
      tap((encuestas) => {
          this._encuestas.next(encuestas);
      })
      );

  }

  getUsuarios():  Observable<User[]> {

    return  this._httpClient.get<User[]>(`${this.urlLocal}user`).pipe(
      tap((usuarios) => {
          this._usuarios.next(usuarios);
      })
    );

  }

  putUsuario(form): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.put(`${this.urlLocal}user/${form.id}`, form)
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
    });

  }

  postUsuario(form): Promise<any> {

    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.urlLocal}user/register`, form)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });

  }

  deleteUsuario(id): Promise<any>
    {
     
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.urlLocal}user/${id}`)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
      });  
  }

  postEncuesta(form): Promise<any>
    {

      return new Promise((resolve, reject) => {
          this._httpClient.post(`${this.urlLocal}encuesta`, form)
              .subscribe((response: any) => {
                
                  resolve(response);
              }, reject);
      });

    }

    deleteEncuesta(id): Promise<any>
    {
     
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.urlLocal}encuesta/${id}`)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
      });  
  }

  getDashboard():  Observable<any> {

    return  this._httpClient.get<any>(`${this.urlLocal}encuesta/dashboard`).pipe(
        tap((dashboard) => {
            this._dashboard.next(dashboard);
        })
    );
    }
      
}