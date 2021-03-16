import { Component, OnInit, NgModule } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SesionService } from '../services/sesion.service'
import { ChatService } from '../services/chat.service'
import { Router } from '@angular/router';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'mensajeria',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  //https://github.com/wedgies/jquery-emoji-picker si
  //https://www.youtube.com/watch?v=3JrBdurwlXo
  //https://github.com/GittiHab/jquery-emojiarea
  //https://www.youtube.com/watch?v=6hgefCLziXU

  usuarios_online;
  cargarmensajes2;
  bienvenida;
  data_bandeja_entrada;
  vc_img;
  vc_username;
  vc_id_user;
  vc_usuario;
  vc_input;
  vc_typing;
  vc_inputimg;
  vc_nomensajes;
  vc_bandeja;
  lista_messages;
  dataimg;
  ventana_chat;
  counter;


  data;
  respuesta;
  bandeja;

  constructor(private socket: Socket, private sesionService: SesionService, private chatService: ChatService) {

    /*Escucha los nuevos mensajes
    this.socket.fromEvent('BandejaEntrada').subscribe(data => {
      this.data = data;
      if (this.data.result === true) {
        this.bandeja = this.data.info;
        console.log(this.bandeja)
      }
    })*/
  }
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }

  ngOnInit(): void {
    var info = this.sesionService.getInfoCurrentUser()

    /*Escucha los usuarios que se conectan*/
    this.socket.emit('nuevo_usuario_online', info, data => {
      if (data) {
        console.log(data)
      } else {
        alert('El usuario ya existe')
      }
    });

    this.socket.on('usernames', data => {
      console.log(data)
      this.usuarios_online = data;
    });


    /*Escucha la bandeja de entrada del usuario en sesion*/
    var user = this.sesionService.getInfoCurrentUser();
    this.socket.emit('ObtenerBandejaEntrada', user.id_user, user.usuario)

    /*Cargamos los mensajes enviados y recibidos */
    this.socket.fromEvent('cargarmensajes').subscribe(respuesta => {
      this.respuesta = respuesta;
      if (this.respuesta.result === true) {
        //alert('si hay mensajes')
        this.vc_nomensajes = document.getElementById('vc_nomensajes')
        this.vc_nomensajes.style.display = 'none'
        this.lista_messages = null
        this.lista_messages = this.respuesta.info;
        console.log('Lista Mesajes', this.lista_messages)
      } else {
        //alert('no hay mensajes')
        this.vc_nomensajes = document.getElementById('vc_nomensajes')
        this.vc_nomensajes.style.display = 'block'
        this.vc_nomensajes.innerHTML = this.respuesta.info
        //console.log('no hay mensajes')
      }
    });


    this.socket.fromEvent('BandejaEntrada').subscribe(data => {
      this.data = data;
      //alert('llego')
      //console.log('bandeja de entrada', this.data.data)
      if (this.data.result === true) {
        this.bandeja = this.data.info;
        console.log(this.bandeja)
      } else {
        console.log(this.data.info)
      }
    })

  }



  AbrirChat(id_user, usuario, nombres, foto) {

    this.lista_messages = null;

    //console.log(id_user, usuario, nombres)
    this.vc_id_user = id_user;
    this.vc_usuario = usuario;

    this.vc_img = document.getElementById('vc_img');
    this.vc_img.src = foto;

    this.vc_username = document.getElementById('vc_username');
    this.vc_username.innerHTML = nombres + "  ";

    /*Mostramos el ChatBox */
    this.ventana_chat = document.getElementById('ventana_chat');
    this.ventana_chat.style.display = 'block'

    /*Ocultamos el mensaje de bienvenida del chat*/
    this.bienvenida = document.getElementById('bienvenida');
    this.bienvenida.style.display = 'none'

    /*Ocultamos el mensaje de bienvenida del chat*/
    //this.counter = document.getElementById('counter' + usuario);
    //this.counter.style.display = 'none'

    /*Obtener Mensajes de la BD*/
    this.socket.emit('ObtenerMensajes2', this.sesionService.getIdCurrentUser(), this.vc_id_user);
  }

  ObtenerIdUsuarioActual() {
    return this.sesionService.getIdCurrentUser()
  }

  EnviarMensaje() {
    this.vc_input = document.getElementById('vc-input');
    this.vc_typing = document.getElementById('vc_typing');
    console.log('El mensaje a enviarse es: ' + this.vc_id_user, this.vc_usuario, this.vc_input.value)

    var message_data = {
      from_usuario: this.sesionService.getIdCurrentUser(),
      mensaje: this.vc_input.value,
      to_usuario: this.vc_id_user,
      fecha: this.sesionService.getFechaActual(),
      user: this.vc_usuario,
    }

    /*var from_usuario= this.sesionService.getIdCurrentUser()
    var mensaje= this.vc_input.value
    var to_usuario= this.vc_id_user
    var fecha= this.sesionService.getFechaActual()
    var user= this.vc_usuario*/

    this.socket.emit('send message', message_data, (cb) => {
      if (cb === true) {
        this.socket.emit('ObtenerBandejaEntrada', this.vc_id_user, this.vc_usuario)
      }
    });
    this.vc_input.value = ''
  }

  EnviarImagen() {
    this.vc_inputimg = document.getElementById('vc_inputimg');
    var file = this.vc_inputimg.files[0];
    const formdata = new FormData()
    formdata.append('imagen-chat', this.vc_inputimg.files[0], file.name);

    //console.log(formdata)
    var from_usuario = this.sesionService.getIdCurrentUser();
    var to_usuario = this.vc_id_user;
    var fecha = this.sesionService.getFechaActual();
    this.chatService.EnviarImagen(formdata, from_usuario, to_usuario, fecha).subscribe(re => {
      this.socket.emit('ObtenerMensajes', this.sesionService.getIdCurrentUser(), this.vc_id_user, this.vc_usuario);
      //this.socket.emit('ObtenerBandejaEntrada', this.sesionService.getIdCurrentUser())
      this.vc_input.value = '';
      this.vc_inputimg.value = '';
      this.vc_typing.innerHTML = '';
    });
  }

}
