import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'

@Component({
    selector: 'bloqueados',
    templateUrl: './bloqueados.component.html',
    styleUrls: ['./bloqueados.component.css']
})
export class BloqueadosComponent implements OnInit {

    constructor(private sesionService: SesionService, private usuarioService: UsuariosService, private router: Router) { }


    lista_bloqueados;
    ngOnInit(): void {
        var id = this.sesionService.getIdCurrentUser();
        this.ObtenerListaBloqueados(id);

    }


    ObtenerListaBloqueados(id_user) {
        this.usuarioService.ObtenerListaBoqueados(id_user).subscribe(respuesta => {

            if (respuesta.result === true) {
                this.lista_bloqueados = respuesta.data;
                document.getElementById('lista_bloqueados').style.display = 'block'
                document.getElementById('no_bloqueados').style.display = 'none'
            } else {
                document.getElementById('no_bloqueados').style.display = 'block'
                document.getElementById('lista_bloqueados').style.display = 'none'

            }
        })
    }

    DesbloquearUsuario(id_follow) {
        var id_user = this.sesionService.getIdCurrentUser();
        this.usuarioService.DesbloquearUsuario(id_user, id_follow).subscribe(respuesta => {
            if (respuesta.validacion === true) {
                this.ObtenerListaBloqueados(id_user);
            } else {

                alert('No se pudo desbloquear al usuario')
            }
        })
    }

}