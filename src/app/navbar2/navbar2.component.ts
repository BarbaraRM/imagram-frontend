import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsuariosService } from '../services/usuarios.service'
@Component({
  selector: 'app-navbar-dos',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  constructor( private usuarioService: UsuariosService, private router: Router) { }
  usuarios;
  si;
  ngOnInit() {
  }

  v_usuario;
  BuscarUsuario() {
    this.v_usuario = document.getElementById("textoBuscar")
    this.v_usuario = this.v_usuario.value
    this.usuarioService.BuscarUsuario(this.v_usuario).subscribe(respuesta => {

      if (respuesta.result) {
        console.log(respuesta.data)
        this.usuarios = respuesta.data;
        this.si = respuesta;
      } else {
        console.log("Error")
      }

    });
  }


  Abrirperfil(usuario) {
    this.v_usuario = document.getElementById("textoBuscar")
    this.v_usuario.value = usuario
    this.router.navigate(['home'])
    this.router.navigate(['perfil/' + usuario])
  }

}
