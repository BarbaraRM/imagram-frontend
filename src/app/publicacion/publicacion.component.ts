import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PublicacionesService } from '../../app/services/publicaciones.service';
import { SesionService } from '../services/sesion.service';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  constructor(private socket: Socket, private sesionService: SesionService, private publicacionesService: PublicacionesService) {

  }


  @Input() id_publicacion: string;
  @Input() id_user: string;
  @Input() usuario: string;
  @Input() imagen: string;
  @Input() descripcion: string;
  @Input() fecha: string;
  @Input() img_perfil: string;
  @Input() cant_megusta: string;
  @Input() cant_meencanta: string;
  @Input() cant_meentristece: string;
  @Input() cant_meenfada: string;
  @Input() cant_medivierte: string;
  @Input() cant_mesorprende: string;
  @Input() cant_comentarios: string;
  @Input() reaccion_usada: string;
  @Input() comentarios: string;
  @Input() guardada: string;


  url_share = environment.share
  /*Variables de Estado NO BORRAR*/
  f = new Date();
  fecha_actual = (this.f.getFullYear() + "-" + (this.f.getMonth() + 1) + "-" + this.f.getDate() + " " +
    this.f.getHours() + ":" + this.f.getMinutes() + ":" + this.f.getSeconds());
  id_usuario_actual = this.sesionService.getIdCurrentUser(); // localStorage.getItem('userID');
  texto_comentario;
  id_coment_to_reaccion;
  txt_edit_comentario;
  id_comentario_nuevo;
  btn_actualizar;
  btn_publicar;
  btn_cancelar;
  nuevocomentario;
  publicacion_toshare
  ngOnInit(): void {

    //this.publicacion_toshare = this.id_publicacion;

    /*Mostrar y ocultar container de reacciones*/
    /*var div = document.getElementById('reacciones_cont');
    var but = document.getElementById('btn_reacciones');

    function showHide(e) {
      e.preventDefault();
      e.stopPropagation();
      if (div.style.display == "none") {
        div.style.display = "block";
      } else if (div.style.display == "block") {
        div.style.display = "none";
      }
    }
    but.addEventListener("click", showHide, false);*/


    /*$(document).ready(function () {
      $("#btn_compartir").on("click", function (e) {
        //this.publicacion_toshare = id_publicacion
        $('modal_compartir').show()
      });
    })*/
  }


  /*Mostrar contenedor de reacciones de publicaciones*/
  div;
  showHide(id_publicacion) {
    this.div = document.getElementById('reacciones_cont' + id_publicacion);
    if (this.div.style.display == "none") {
      this.div.style.display = "block";
    } else if (this.div.style.display == "block") {
      this.div.style.display = "none";
    }
  }


  /*Mostrar contenedor de reacciones de comentarios*/
  div_rea_coment;
  showHideReaComent(id_comentario) {//e
    this.div_rea_coment = document.getElementById('reacciones_cont_comentarios' + id_comentario);
    if (this.div_rea_coment.style.display == "none") {
      this.div_rea_coment.style.display = "block";
      this.id_coment_to_reaccion = id_comentario
    } else if (this.div_rea_coment.style.display == "block") {
      this.div_rea_coment.style.display = "none";
    }
  }

  reaccionar(id_publicacion, tipo_reaccion) {
    var div = document.getElementById('reacciones_cont' + id_publicacion);

    console.log(id_publicacion, tipo_reaccion)
    this.socket.emit('ReaccionarPublicacion', id_publicacion, this.id_usuario_actual, this.fecha_actual, tipo_reaccion, (salida) => {
      if (salida === true) {
        /*Si la salida es true el boton reaccion debe cambiar con el icono y nombre de la reaccion selecionada*/
        /*Llamar el api para recargar las publicaciones */
        div.style.display = "none";
        console.log('se guardo la reaccion')
        this.socket.emit('CargarNotificaciones', this.sesionService.getIdCurrentUser())
        this.socket.emit('ObtenerPublicaciones', this.id_usuario_actual)

      } else {
        /*Notificacion push "Ha ocurrido un error"*/
        div.style.display = "none";
        console.log('NO guardo la reaccion')
      }
    });
  }

  Comentar(id_publicacion): void {
    console.log(id_publicacion, this.id_usuario_actual, this.fecha_actual, this.texto_comentario)

    this.socket.emit('ComentarPublicacion', id_publicacion, this.id_usuario_actual, this.fecha_actual, this.texto_comentario, (salida) => {
      if (salida === true) {
        this.socket.emit('ObtenerPublicaciones', this.id_usuario_actual);
        this.texto_comentario = '';
        console.log('se guardó el comentario');
      } else {
        // Notificación push de que no se pudo guardar le mensaje
        console.log('no se guardó el comentario');
      }
    });
  }

  ReaccionarComentario(tipo_reaccion): void {
    console.log('llegaron a la funcion ReaccionarComentario: ' + this.id_coment_to_reaccion + "/" + tipo_reaccion)

    this.socket.emit('ReaccionarComentario', this.id_coment_to_reaccion,
      this.id_usuario_actual, this.fecha_actual, tipo_reaccion, (salida) => {
        if (salida === true) {
          this.div_rea_coment.style.display = 'none';
          console.log('se guardo la reaccion del comentario');

          this.socket.emit('ObtenerPublicaciones', this.id_usuario_actual);

        } else {
          this.div_rea_coment.style.display = "none";
          console.log('NO guardo la reaccion del comentario');
        }
      });

  }

  /*Habilita la opcion de editar el comentario*/
  AuxEditarComentario(id_publicacion, id_comentario, texto_comentario) {

    this.btn_actualizar = document.getElementById('btn_actualizar');
    this.btn_cancelar = document.getElementById('btn_cancelar');
    this.btn_publicar = document.getElementById('btn_publicar');

    if (this.btn_actualizar.style.display == "none") {
      this.btn_actualizar.style.display = "block";
      this.btn_cancelar.style.display = "block";
      this.btn_publicar.style.display = "none";
    }

    console.log('Se editará el comentario: ' + id_publicacion, id_comentario, texto_comentario)
    this.txt_edit_comentario = document.getElementById('txt_comentario' + id_publicacion);
    this.txt_edit_comentario.value = (texto_comentario)
    this.txt_edit_comentario.style = "background: #d8f6f7"
    this.id_comentario_nuevo = id_comentario
  }

  EditarComentario() {
    //this.txt_edit_comentario = document.getElementById('txt_comentario' + id_publicacion);
    //this.nuevocomentario = this.txt_edit_comentario.value
    //console.log(this.id_comentario_nuevo, this.nuevocomentario)
    this.publicacionesService.EditarComentario(this.id_comentario_nuevo, this.id_usuario_actual, this.fecha_actual, this.texto_comentario).subscribe(respuesta => {
      console.log(respuesta.result)
      if (respuesta.result === true) {
        this.texto_comentario = ''
        this.socket.emit('ObtenerPublicaciones', this.id_usuario_actual)

      } else {
        console.log('NO actualizo el comentario')
      }
    })
  }

  CancelarEdicion(id_publicacion) {
    this.btn_actualizar = document.getElementById('btn_actualizar');
    this.btn_cancelar = document.getElementById('btn_cancelar');
    this.btn_publicar = document.getElementById('btn_publicar');
    this.btn_actualizar.style.display = "none";
    this.btn_cancelar.style.display = "none";
    this.btn_publicar.style.display = "block";
    this.txt_edit_comentario = document.getElementById('txt_comentario' + id_publicacion);
    this.txt_edit_comentario.style = "background: #fff"
    this.texto_comentario = ''
  }

  EliminarComentario(id_comentario, id_publicacion) {
    console.log('Se eliminará el comentario: ' + id_comentario)
    this.publicacionesService.EliminarComentario(id_comentario, id_publicacion).subscribe(respuesta => {
      if (respuesta.result === true) {
        this.socket.emit('ObtenerPublicaciones', this.id_usuario_actual)
      } else {
        console.log('NO elimino el comentario')
      }
    })
  }

  EliminarPublicacion(id_publicacion) {

    //console.log('vas a eliminar la publicacion ' + id_publicacion)
    this.publicacionesService.EliminarPublicacion(id_publicacion, this.id_usuario_actual).subscribe(respuesta => {
      if (respuesta.result === true) {
        this.socket.emit('ObtenerPublicaciones', this.id_usuario_actual)
      } else {
        console.log('NO elimino la publicacion')
      }
    })
  }

  SumarReacciones() {
    return (parseInt(this.cant_megusta) + parseInt(this.cant_meencanta)
      + parseInt(this.cant_medivierte) + parseInt(this.cant_meentristece)
      + parseInt(this.cant_meenfada) + parseInt(this.cant_mesorprende));
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


  PasarID(id_publicacion) {
    this.publicacion_toshare = id_publicacion;
    alert('llego a pasarID')
    alert(this.publicacion_toshare)
  }

  CompartirPublicacion = (id) => {
    //var id = e.target.id;
    var link = this.url_share + '/' + this.publicacion_toshare
    //var link = this.url_share + '/' + this.id_publicacion

    var texto = '*Compartido%20desde%20Imagram.*%20Esta%20publicación%20puede%20interesarte.%0A'


    if (id === 'btn-dm') {
      alert('Reenviar al DM' + link)
    }

    if (id === 'btn-fb') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link) + '?t=' + texto);
    }

    if (id === 'btn-ms') {
      window.open('fb-messenger://share/?link=' + encodeURIComponent(link));
    }

    if (id === 'btn-ws') {
      window.open('https://api.whatsapp.com/send?text=' + texto + encodeURIComponent(link));
    }

    if (id === 'btn-tw') {
      window.open('https://twitter.com/intent/tweet?text=' + texto + encodeURIComponent(link));
    }

  }

  ic_guardar;
  GuardarPublicacion(id_publicacion) {
    //alert('llego')
    this.ic_guardar = document.getElementById('guardar' + id_publicacion)

    this.socket.emit('GuardarPublicacion', id_publicacion, this.sesionService.getIdCurrentUser(), (salida) => {
      if (salida === true) {
        //this.ic_guardar.style.background = 'red'
        this.ic_guardar.innerHTML = '<i class="fas fa-bookmark"></i>'
      } else {
        this.ic_guardar.innerHTML = '<i class="far fa-bookmark"></i>'
      }
    })
  }

  /*modal_compartir;
  AbrirModal(id_publicacion) {
    this.publicacion_toshare = id_publicacion

    $(document).ready(function () {
      $('modal_compartir').modal('fast');

    });
  }*/



}
