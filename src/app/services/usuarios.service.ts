import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private htttp: HttpClient, private router: Router) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = environment.baseUrl



  ObtenerDatosUsuario(id_usuario: string): Observable<any> {
    return this.htttp
      .get<any>(this.baseUrl + '/usuarios/obtener_infouser/' + id_usuario,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  ValidarCuenta(id_user) {
    return this.htttp
      .get<any>(this.baseUrl + '/usuarios/validarestadocuenta/' + id_user,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  ReactivarCuenta(id_user) {
    return this.htttp
      .get<any>(this.baseUrl + '/usuarios/reactivarcuenta/' + id_user,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }




  /*kevin */
  EliminarCuenta(id_user: string): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/inactivarcuenta',
        { id_user: id_user },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  CambiarContra(id_user: string, password: string): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/ModiContra',
        { id_user: id_user, password: password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }
  CorreoExiste(correo: string): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/validarcorreo',
        { correo: correo },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  EnviarCorreoRecuperar(correo: string): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/emailrecuperacuenta',
        { correo: correo },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  BuscarUsuario(usuario: string): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/obtener_infouseru3',
        { usuario: usuario },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  BuscarUsuarioTodo(usuario: string): Observable<any> {
    return this.htttp
      .get<any>(this.baseUrl + '/usuarios/obtener_infouseru/' + usuario,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  ObtenerPublicacionesCreadas(id_user): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/publicaciones/obtener_publicaciones_creadas',
        { id_user: id_user },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  ObtenerPublicacionesGuardadas(id_user): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/publicaciones/obtener_publicaciones_guardadas',
        { id_user: id_user },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  ObtenerListaSeguidos(id_user): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/getlistaseguidos',
        { id_user: id_user },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  ObtenerListaSeguidores(id_user): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/getlistaseguidores',
        { id_user: id_user },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  ComprobarSigoUsuario(id_user, me): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/comprobarsigousuario',
        {
          id_user: id_user,
          me: me,
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  SeguirA(me, id_user): Observable<any> {

    return this.htttp
      .post<any>(this.baseUrl + '/friends/followto',
        {
          id_user: id_user,
          me: me,
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  BloquearCuenta(me, id_user): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/bloquearcuenta',
        {
          id_follow: id_user,
          id: me,
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  Registrar(usuario): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/registrar',
        usuario,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }



  ObtenerListaBoqueados(id_user): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/bloqueados',
        {
          id_user: id_user,
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  DesbloquearUsuario(id_user, id_follow): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/desbloquearcuenta',
        {
          id: id_user,
          id_follow: id_follow
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  PublicarImagenPerfil(formdata, from_usuario): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/upload_perfil/' + from_usuario,
        formdata,
      ).pipe(map(data => data));
  }

  PublicarImagenPortada(formdata, from_usuario): Observable<any> {
    return this.htttp
      .post<any>(this.baseUrl + '/usuarios/upload_portada/' + from_usuario,
        formdata,
      ).pipe(map(data => data));
  }


  Sugerencias(id_user): Observable<any> {
    return this.htttp
      .get<any>(this.baseUrl + '/friends/sugerencias/' + id_user
      ).pipe(map(data => data));
  }
}
