import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private htttp: HttpClient, private router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = environment.baseUrl

  login(usuario: string, password: string): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/login',
        { usuario, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  logout(): Observable<any> {
    return this.htttp
      .get<any>(this.baseUrl + '/usuarios/logout')
      .pipe(map(data => data));
  }

  getIdCurrentUser():any{
    const user = localStorage.getItem('userID');
    if (user !== null) {
      var userJSON = JSON.parse(user)
      var id_user = userJSON.id_user
      //console.log(id_user)
      return id_user;
    } else {
      return null;
    }
  }

  getIdValidado() {
    const user = localStorage.getItem('idvalidado');
    if (user !== null) {
      return user;
    } else {
      return null;
    }
  }

  getUsernameCurrentUser() {
    const user = localStorage.getItem('userID');
    if (user !== null) {
      var userJSON = JSON.parse(user)
      var id_user = userJSON.usuario
      //console.log(id_user)
      return id_user;
    } else {
      return null;
    }
  }

  getvalidarContra() {
    const user = localStorage.getItem('validarC');
    if (user !== null) {
      return user;
    } else {
      return null;
    }
  }

  getInfoCurrentUser() {
    const user = localStorage.getItem('userID');
    if (user !== null) {
      var userJSON = JSON.parse(user)
      return userJSON;
    } else {
      return null;
    }
  }


  getFechaActual() {
    var f = new Date();
    var fecha_actual = (f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
    return fecha_actual
  }
}
