import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private htttp: HttpClient, private router: Router) { }
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    baseUrl = environment.baseUrl

    EnviarImagen(formdata, from_usuario, to_usuario, fecha): Observable<any> {
        var ides = from_usuario + '.' + from_usuario + '.' + to_usuario
        //console.log(ides)
        return this.htttp
            .post<any>(this.baseUrl + '/chat/enviarimagen/' + ides,
                formdata,
            ).pipe(map(data => data));
    }


    /*ObtenerDatosUsuario(id_usuario: string): Observable<any> {
      return this.htttp
        .get<any>(this.baseUrl + '/usuarios/obtener_infouser/' + id_usuario,
          { headers: this.headers }
        )
        .pipe(map(data => data));
    }*/



    /*kevin */




}
