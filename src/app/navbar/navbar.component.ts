import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SesionService } from '../services/sesion.service'
import { Router } from '@angular/router'
import { UsuariosService } from '../services/usuarios.service'

declare interface RouteInfo {
  path: string;
  title: string;
}


export const routes_navbar: RouteInfo[] = [
  { path: '/home', title: 'Home' },
  { path: '/perfil', title: 'Perfil' },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private socket: Socket, private sesionService: SesionService, private usuarioService: UsuariosService, private router: Router) { }
  notificaciones;
  usuarios;
  usuario;
  si;
  id_user_current;
  ngOnInit(): void {

    var info = this.sesionService.getInfoCurrentUser()
    this.socket.emit('nuevo_usuario_online', info, data => {
      if (data) {
        console.log(data)
      } else {
        alert('El usuario ya existe')
      }
    });


    this.socket.emit('CargarNotificaciones', this.sesionService.getIdCurrentUser())

    this.socket.fromEvent('RecibirNotificacion').subscribe(data => {
      //console.log('llego a la funcion recibir notificaciones')
      //console.log(data)
      this.AnalizarNotificaciones(data);
    });

    this.id_user_current = this.sesionService.getUsernameCurrentUser();
    //this.id_user_current = "['/perfil/" + this.id_user_current + "']";

  }

  v_usuario;
  BuscarUsuario() {
    this.v_usuario = document.getElementById("textoBuscar2")
    this.v_usuario = this.v_usuario.value
    console.log(this.v_usuario)
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
    this.router.navigate(['perfil/' + usuario]);
  }


  AnalizarNotificaciones(data) {
    if (data.result === 'EMPTY') {
      console.log(data.info + ' No tienes Notificaciones')
    } else {
      //Muestra en el area de notificaciones la lista
      //console.log(data)
      this.notificaciones = data;
    }
  }


  Logout() {
    this.socket.disconnect();
    localStorage.removeItem('token');
    localStorage.removeItem('userID')
    this.router.navigate(['/']);
    /*  
    this.sesionService.logout().subscribe(res => {
      console.log(res)
      localStorage.removeItem('token');
      localStorage.removeItem('userID')
      this.router.navigate(['/']);
    },
      err => console.log(err)
    )*/
  }


  AceptarSolicitud(from_usuario, to_usuario) {

    var solicitud = true;
    var f = new Date();
    const fecha = (f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds());

    this.socket.emit('SolicitudSeguimiento', from_usuario, to_usuario, solicitud, fecha, (salida) => {
      if (salida === true) {
        //alert('Has aceptado la solicitud de seguimiento')
      } else {
        //alert('Has rechazado la solicitud de seguimiento')
      }

    })

  }

  RechazarSolicitud(from_usuario, to_usuario) {
    var solicitud = false;

    var f = new Date();
    const fecha = (f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds());

    this.socket.emit('SolicitudSeguimiento', from_usuario, to_usuario, solicitud, fecha, (salida) => {
      if (salida === true) {
        alert('Has aceptado la solicitud de seguimiento')
      } else {
        alert('Has rechazado la solicitud de seguimiento')
      }

    })

  }



}
