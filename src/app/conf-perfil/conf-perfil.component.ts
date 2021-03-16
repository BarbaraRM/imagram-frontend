import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'

@Component({
  selector: 'configuracion-perfil',
  templateUrl: './conf-perfil.component.html',
  styleUrls: ['./conf-perfil.component.css']
})
export class confperfil implements OnInit {

  constructor(private sesionService: SesionService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {



  }

  SuspenderCuenta() {
    this.usuarioService.EliminarCuenta(this.sesionService.getIdCurrentUser()).subscribe(respuesta => {
      if (respuesta.result) {
        localStorage.removeItem('token');
        localStorage.removeItem('userID')
        this.router.navigate(['/']);
      } else {
        console.log("AQUI")
      }
    });
  }

}
