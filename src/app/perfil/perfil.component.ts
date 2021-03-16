import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { BiografiaService } from '../services/biografia.service';
import { Socket } from 'ngx-socket-io';

import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private sesionService: SesionService, private usuarioService: UsuariosService, private router: Router, private socket: Socket) { }


  usuario = {

    id_user: '',
    nombre_completo: '',
    usuario: '',
    correo: '',
    url_foto_perfil: '',
    url_foto_portada: '',
    biografia: '',
    trabajo: '',
    fecha_nacim: '',
    estudio: '',
    ubicacion: '',
    cant_seguidos: '',
    cant_seguidores: '',
    cant_publicaciones: '',
  }

  lista_publicaciones_creadas;
  lista_publicaciones_guardadas;
  lista_seguidos;
  lista_seguidores;
  btn_seguir;
  btn_seguidos;
  btn_seguidores;
  btn_bloquear;
  usuario_buscado;
  usuario_sesion;


  ngOnInit(): void {
    if (this.sesionService.getIdCurrentUser() === null) {
      this.router.navigate(['/']);
    }
    var tmp = [];
    var link = document.URL;
    tmp = link.split('/');
    this.usuario_buscado = tmp[4];
    var me = this.sesionService.getIdCurrentUser()
    this.usuario_sesion = me;

    this.usuarioService.ComprobarSigoUsuario(tmp[4], me).subscribe(comprobacion => {

      if (comprobacion.result === true) {
        var estado = comprobacion.data.estado;
        console.log('Si lo sigo pero esta ' + estado)

        if (comprobacion.data.estado === 'BLOQUEADO') {
          this.router.navigate(['/bloqueados']);
        }

      } else {
        //console.log('No lo sigo')
        //console.log(comprobacion.data)
        //alert('Session: ' + this.sesionService.getIdCurrentUser() + " /// to" + comprobacion.data)
        //console.log(comprobacion.data)
        //console.log(this.sesionService.getIdCurrentUser())
        if (comprobacion.data.toString() !== this.sesionService.getIdCurrentUser().toString()) {
          this.btn_seguidores = document.getElementById('btn_seguidores')
          this.btn_seguidos = document.getElementById('btn_seguidos')
          this.btn_bloquear = document.getElementById('btn_bloquear')
          this.btn_bloquear.style.display = 'none'
          this.btn_seguidores.style.display = 'none'
          this.btn_seguidos.style.display = 'none'
          this.btn_seguir = document.getElementById('btn_seguir')
          this.btn_seguir.style.display = 'block'
        } else {
          this.btn_bloquear = document.getElementById('btn_bloquear')
          this.btn_bloquear.style.display = 'none'
        }


      }
    });

    this.BuscarUsuario(tmp[4])

    this.usuarioService.ObtenerPublicacionesCreadas(tmp[4]).subscribe(lpcreadas => {

      if (lpcreadas.result === true) {
        this.lista_publicaciones_creadas = lpcreadas.data
        console.log(this.lista_publicaciones_creadas)
      } else {
        console.log('no tienes publicaciones')
      }
    });

    this.usuarioService.ObtenerPublicacionesCreadas(tmp[4]).subscribe(lpcreadas => {

      if (lpcreadas.result === true) {
        this.lista_publicaciones_creadas = lpcreadas.data
        console.log(this.lista_publicaciones_creadas)
      } else {
        console.log('no tienes publicaciones')
      }
    });

    this.usuarioService.ObtenerPublicacionesGuardadas(tmp[4]).subscribe(lpcreadas => {

      if (lpcreadas.result === true) {
        this.lista_publicaciones_guardadas = lpcreadas.data
        console.log(this.lista_publicaciones_guardadas)
      } else {
        console.log('no tienes publicaciones')
      }
    });

    this.usuarioService.ObtenerListaSeguidos(tmp[4]).subscribe(seguidos => {
      if (seguidos.result === true) {
        this.lista_seguidos = seguidos.data
        console.log(this.lista_seguidos)
      } else {
        console.log('no tienes publicaciones')
      }
    });

    this.usuarioService.ObtenerListaSeguidores(tmp[4]).subscribe(seguidores => {
      if (seguidores.result === true) {
        this.lista_seguidores = seguidores.data
        console.log(this.lista_seguidores)
      } else {
        console.log('no tienes publicaciones')
      }
    });


  }

  BuscarUsuario(usuario) {

    this.usuarioService.BuscarUsuarioTodo(usuario).subscribe(respuesta => {

      if (respuesta.result) {
        console.log(respuesta.data[0])
        this.usuario = respuesta.data[0];
      } else {
        console.log("Error")
      }

    });
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

  btn_seguir_pendiente;

  SeguirA() {


    var f = new Date();
    const fecha = (f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds());


    this.socket.emit('SeguirA', this.usuario_sesion, this.usuario_buscado, fecha, (salida) => {
      if (salida === true) {
        //alert('pendiente')
        this.btn_seguir_pendiente = document.getElementById('btn_seguir')
        this.btn_seguir_pendiente.innerHTML = 'Pendiente'


      } else {

      }

    });
  }

  BloquearUsuario() {
    //alert('quieres bloquear')

    this.usuarioService.BloquearCuenta(this.usuario_sesion, this.usuario_buscado).subscribe(bloqueo => {

      if (bloqueo.validacion === true) {
        this.router.navigate(['/home']);
      } else {
        alert('No se ha podido bloquear a este usuario, talvez ya no existe')
      }
    });



  }


  f_perfil;
  f_portada;
  SubirFotoPerfil() {
    this.f_perfil = document.getElementById('f_perfil');
    var file = this.f_perfil.files[0];
    console.log(file)
    var formdata = new FormData();
    formdata.append('upload_perfil', file, file.name);
    var from_usuario = this.sesionService.getIdCurrentUser();

    this.usuarioService.PublicarImagenPerfil(formdata, from_usuario).subscribe(respuesta => {
      if (respuesta.result === true) {
        this.BuscarUsuario(respuesta.usuario);
        //alert('Se actualizara el perfil')
      } else {
        alert('Ha ocurrido un error intentalo de nuevo')
        //this.router.navigate(['home']);
      }
    });
  }


  SubirFotoPortada() {
    this.f_portada = document.getElementById('f_portada');
    var file = this.f_portada.files[0];
    console.log(file)
    var formdata = new FormData();
    formdata.append('upload_portada', file, file.name);
    var from_usuario = this.sesionService.getIdCurrentUser();

    this.usuarioService.PublicarImagenPortada(formdata, from_usuario).subscribe(respuesta => {
      if (respuesta.result === true) {
        this.BuscarUsuario(respuesta.usuario);
        //alert('Se actualizara la portada')
      } else {
        alert('Ha ocurrido un error intentalo de nuevo')
        //this.router.navigate(['home']);
      }
    });
  }

  /*this.usuarioService.SeguirA(this.usuario_sesion, this.usuario_buscado).subscribe(followto => {
    if (followto.result === true) {
      //this.lista_seguidores = followto.data
      alert('Siguiendo')
    } else {
      console.log('no tienes publicaciones')
    }
  });*/



}

/*updatePerfilPhoto() {
  const formData = new FormData();
  formData.append('file', this.id_user.url_foto_perfil);
  this.biogService.updatePerfilPhoto(formData).subscribe(res => {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`${this.sesionService.getIdCurrentUser()}/perfil`]);
  })
}*/

/*
updatePortadaPhoto() {
  const formData = new FormData();
  formData.append('file', this.id_user.url_foto_portada);
  this.biogService.updatePortadaPhoto(formData).subscribe(res => {
    this.ngOnInit();
  })
}

onFileChange(e) {
  this.id_user.url_foto_perfil = e.target.files[0];
  this.updatePerfilPhoto();
}

onPortadaChange(e) {
  this.id_user.url_foto_portada = e.target.files[0];
  this.updatePortadaPhoto();
}*/



