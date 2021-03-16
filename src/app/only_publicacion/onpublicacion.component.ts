import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from '../../app/services/publicaciones.service';
import { Socket } from 'ngx-socket-io';
import { SesionService } from '../services/sesion.service';
import { HistoriaInterface, ListaHistInterface } from '../models/historia-interface';
import { UsuariosService } from '../services/usuarios.service';

@Component({
    selector: 'app-onpublicacion',
    templateUrl: './onpublicacion.component.html',
    styleUrls: ['./onpublicacion.component.css']
})
export class OnPublicacion implements OnInit {

    constructor(private sesionService: SesionService, private PublicacionesServive: PublicacionesService, private usuarioServices: UsuariosService,
        private socket: Socket, private router: Router) { }

    publicaciones;
    id_publicacion;
    respuesta;
    ngOnInit(): void {

        if (this.sesionService.getIdCurrentUser() === null) {
            this.router.navigate(['/']);
        }
        var tmp = [];
        var link = document.URL;
        tmp = link.split('/');
        this.id_publicacion = tmp[4];
        //alert('se buscara la publicacion ' + this.id_publicacion)
        // var me = this.sesionService.getIdCurrentUser()
        var id_user = this.sesionService.getIdCurrentUser()
        console.log(id_user, parseInt(this.id_publicacion))

        this.socket.emit('ObtenerUnaPublicacion', parseInt(this.id_publicacion), id_user);
        this.socket.fromEvent('CargarUnaPublicacion').subscribe(respuesta => {
            console.log(respuesta)
            this.respuesta = respuesta
            this.publicaciones = this.respuesta;
        })
        /*
        this.PublicacionesServive.ObtenerUnaPublicacion(parseInt(this.id_publicacion), id_user).subscribe(respuesta => {
            console.log('respuesta', respuesta)
            if (respuesta.result === true) {
                console.log('unapublicacion', respuesta.data)
                this.publicaciones = respuesta.data;
            } else {

            }
        })*/
    }
}