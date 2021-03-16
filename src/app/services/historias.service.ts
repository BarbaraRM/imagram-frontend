import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';


@Injectable({
    providedIn: 'root'
})
export class HistoriasService {

    constructor(private htttp: HttpClient, private router: Router) { }

    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    baseUrl = environment.baseUrl


    EnviarImagen(formdata, from_usuario, descripcion): Observable<any> {
        var ides = from_usuario + '.' + from_usuario + '.' + descripcion
        return this.htttp
            .post<any>(this.baseUrl + '/historias/upload_historia/' + ides,
                formdata,
            ).pipe(map(data => data));
    }

    EliminarHistoria( id_historia: string,id_user: string): Observable<any> {
        return this.htttp
            .post<any>(this.baseUrl + '/historias/eliminar_historias',
                {  id_historia: id_historia,id_user: id_user },
                { headers: this.headers }
            )
            .pipe(map(data => data));
    }

}