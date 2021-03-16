import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'

@Component({
    selector: 'estado-cuenta',
    templateUrl: './estado-cuenta.component.html',
    styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuenta implements OnInit {

    constructor(private sesionService: SesionService, private usuariosService: UsuariosService, private router: Router) { }

    ngOnInit(): void {



    }

    ReactivarCuenta() {
        var id = this.sesionService.getIdCurrentUser();
        alert(id)

        this.usuariosService.ReactivarCuenta(id).subscribe(validacion => {

            if (validacion.result === true) {
                alert('Listo! Vuelve a iniciar sesión como siempre')
                this.router.navigate(['/login']);
            }
        })

    }

    Cancelar() {
        this.router.navigate(['/login']);
    }


}