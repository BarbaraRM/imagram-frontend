import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from '../services/publicaciones.service';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'

@Component({
    selector: 'explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class Explorar implements OnInit {

    constructor(private sesionService: SesionService, private usuariosService: UsuariosService, private publicacionService: PublicacionesService, private router: Router) { }
    lista_hashtags;
    lista_pubhash;
    lista_aletorias;

    ngOnInit(): void {
        this.publicacionService.ObtenerHashtags().subscribe(respuesta => {
            if (respuesta.result === true) {
                this.lista_hashtags = respuesta.data
                console.log(this.lista_hashtags)
            } else {
                alert('No hay hashtags')

            }
        })

        this.ObtenerPublicacionesHashtagAleatorio();

    }

    IdentificarExtension(url: String) {
        var respuesta = url.split('.');
        var resultado;

        if (respuesta[1] === 'jpg' || respuesta[1] === 'png' || respuesta[1] === 'jpeg') {
            resultado = 'IMAGEN'
        }
        if (respuesta[1] === 'mp4' || respuesta[1] === 'mp3') {
            resultado = 'VIDEO'
        }

        return resultado
    }

    ObtenerPublicacionesHashtag(hashtag) {
        if (hashtag === 'todas') {
            this.lista_pubhash = null;
            this.ObtenerPublicacionesHashtagAleatorio()

        } else {
            this.lista_aletorias = null;
            this.publicacionService.ObtenerPublicacionesHashtags(hashtag).subscribe(respuesta => {
                if (respuesta.result === true) {
                    this.lista_pubhash = respuesta.data
                    //console.log(respuesta.data)
                } else {
                    //alert('No hay publicaciones para este hashtags')

                }
            })
        }

    }

    ObtenerPublicacionesHashtagAleatorio() {
        //alert('publicaciones del hastag ' + hashtag)

        ///*select hashtag from hashtags where lower(hashtag) LIKE 'paris' group by (hashtag)*/
        this.publicacionService.ObtenerPublicacionesAletatoriasHashtags().subscribe(respuesta => {
            if (respuesta.result === true) {
                this.lista_aletorias = respuesta.data
                console.log(respuesta.data)
            } else {
                //alert('No hay publicaciones para este hashtags')

            }
        })
    }
}