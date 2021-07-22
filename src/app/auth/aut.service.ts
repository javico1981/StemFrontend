import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _httpClient: HttpClient) { }

  urlLocal= '/api/'



  logear(form): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.urlLocal}user/login`, form)
          .subscribe((response: any) => {

            if (response.logeado) {
              this.setLogin();
              this.setUserData(response.user[0]);
            }
              resolve(response);
          }, reject);
  });
  }



  isLogged(): boolean {
    if (localStorage.getItem('login')) {
        return true;
    } else { 
        return false;
    }
  }


  setLogin(): void {
    localStorage.setItem('login', 'logeado')
  }

  logOut(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('userData');
    this._router.navigate(['public/login']);
  }

  setUserData(userData): void {
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('userData')) ?? null;
  }


  registrar(form): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.urlLocal}user/register`, form)
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
    
  }

  updateUserData(form): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.put(`${this.urlLocal}user/${form.id}`, form)
          .subscribe((response: any) => {
              if (!response.errors) {
                this.setUserData(response)
              }
              resolve(response);
          }, reject);
  });

  }

}