import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private htttp: HttpClient, private router: Router) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  headers2: HttpHeaders = new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  });
  baseUrl = environment.baseUrl

  ObtenerPublicaciones(id_usuario: string): Observable<any> {
    /*return this.htttp
      .post<any>(this.baseUrl + '/publicaciones/obtener_publicaciones', { id_user: 45 }, { headers: this.headers })
      .pipe(map(data =>
        console.log(data.data)
      ));*/

    const result = this.htttp.post<any>(
      this.baseUrl + '/publicaciones/obtener_publicaciones',
      { id_user: id_usuario },
      { headers: this.headers }
    );
    console.log('h');
    console.log(result);
    return result;
  }

  ////AQUI AGREGUE YOOOOOOOOOOO
  verHistoria(id: string, user: string): Observable<any> {
    let id_historia = parseInt(id)
    let id_user = parseInt(user)
    const url_api = this.baseUrl + '/historias/registrar_vista';
    return this.htttp.post<any>(
      'http://localhost:5000/api/historias/registrar_vista',
      {
        "id_historia": 6,
        "id_user": 45
      },
      { headers: this.headers }
    );
    //console.log(result);
    //eturn result;
  }


  EditarComentario(id_comentario: string, id_user: string, fecha_comentario: string, texto_comentario: string): Observable<any> {
    console.log('llego' + id_comentario, id_user, fecha_comentario, texto_comentario)
    var result = this.htttp.post<any>(this.baseUrl + '/publicaciones/editar_comentario', { id_comentario, id_user, fecha_comentario, texto_comentario }, { headers: this.headers });
    return result;
  }

  EliminarComentario(id_comentario: string, id_publicacion: string): Observable<any> {
    console.log("Eliminar comentario: " + id_comentario, id_publicacion)
    var result = this.htttp.post<any>(this.baseUrl + '/publicaciones/eliminar_comentario', { id_comentario, id_publicacion }, { headers: this.headers });
    return result;
  }

  EliminarPublicacion(id_publicacion: string, id_user: string): Observable<any> {
    console.log("Eliminar publicacion: " + id_user, id_publicacion)
    var result = this.htttp.post<any>(this.baseUrl + '/publicaciones/eliminar_publicacion', { id_publicacion, id_user }, { headers: this.headers });
    return result;
  }

  EnviarImagen(formdata, from_usuario, descripcion): Observable<any> {


    descripcion = descripcion + ' ';
    var lista_hashtag = []
    var new_descripcion = '';
    for (var i = 0; i < descripcion.length; i++) {


      if (descripcion.charAt(i) !== '#') {
        new_descripcion = new_descripcion + descripcion.charAt(i)
      }



      if (descripcion.charAt(i) === "#") {
        var hastag = ''
        new_descripcion = new_descripcion + '-'

        for (var j = i; j < descripcion.length; j++) {

          if ((descripcion.charAt(j) !== "#")) {
            new_descripcion = new_descripcion + descripcion.charAt(j)
          }

          if (descripcion.charAt(j) !== " ") {
            hastag = hastag + descripcion.charAt(j + 1);
          } else {
            lista_hashtag.push(hastag)
            i = j
            break;
          }
        }
      }
    }

    var hashtags = ''
    for (var i = 0; i < lista_hashtag.length; i++) {
      hashtags = hashtags + lista_hashtag[i]
    }

    var ides = from_usuario + '.' + hashtags + '.' + new_descripcion

    console.log(ides)

    return this.htttp
      .post<any>(this.baseUrl + '/publicaciones/upload_publicacion/' + ides,
        formdata,
      ).pipe(map(data => data));



  }


  ObtenerHashtags() {
    return this.htttp
      .get<any>(this.baseUrl + '/publicaciones/hashtags/'
      ).pipe(map(data => data));
  }


  ObtenerPublicacionesHashtags(hashtag) {
    return this.htttp
      .get<any>(this.baseUrl + '/publicaciones/hashtags/' + hashtag
      ).pipe(map(data => data));
  }

  ObtenerPublicacionesAletatoriasHashtags() {
    return this.htttp
      .get<any>(this.baseUrl + '/publicaciones/pubhashtags/'
      ).pipe(map(data => data));
  }

  ObtenerUnaPublicacion(id_user, id_publicacion) {
    return this.htttp
      .post<any>(this.baseUrl + '/publicaciones/unapublicacion/', {
        id_user: id_user,
        publicacion: id_publicacion
      }
      ).pipe(map(data => data));
  }


}

