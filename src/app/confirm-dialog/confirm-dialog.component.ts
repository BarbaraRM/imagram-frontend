import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaInterface } from '../models/historia-interface';
import { PublicacionesService } from '../../app/services/publicaciones.service';
import { Socket } from 'ngx-socket-io';
import { SesionService } from '../services/sesion.service';
import { HistoriasService } from '../services/historias.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() idUser: string;
  @Input() lista: HistoriaInterface[];
  @Input() foto: string;
  @Input() publicadaPor: string;
  @Input() cantVistos: string;

  id_slide = '';

  constructor(private modalService: NgbModal, private historias2: HistoriasService, private sesionService: SesionService, private socket: Socket, private publicacionesService: PublicacionesService, private router: Router) { }
  id_usuario_actual = this.sesionService.getIdCurrentUser();
  Todashistorias;



  publicaciones;
  historia_list: HistoriaInterface[];
  historias = [];
  mishistorias: any = [];
  dataSource;
  error = false;
  usuario_info;
  mi_historia;
  id_user_current;
  lista_sugerencias;

  ngOnInit(): void {
    this.ultimaHistoria();
  }

  onClickNO(): void {
    console.log('no');
  }


  IdentificarExtension(url: string): any {
    const respuesta = url.split('.');
    let resultado;

    if (respuesta[1] === 'jpg' || respuesta[1] === 'png' || respuesta[1] === 'jpeg') {
      resultado = 'IMAGEN';
    }
    if (respuesta[1] === 'mp4' || respuesta[1] === 'mp3') {
      resultado = 'VIDEO';
    }

    return resultado;
  }

  minutos_publicacion(minutos): string {
    if (minutos != '0') {
      return 'Hace ' + minutos + ' min';
    } else {
      return 'Justo ahora';
    }
  }

  EliminarHistoria(id_historia, id_user) {
    console.log(id_historia + ' AQUI ESTOY ' + id_user)
    this.historias2.EliminarHistoria(id_historia, id_user).subscribe(respuesta => {

      if (respuesta.result) {
        console.log('Hola')
        this.usuario_info = this.sesionService.getInfoCurrentUser();
        this.id_user_current = this.sesionService.getUsernameCurrentUser();

        // seccion para mi historia
        this.mishistorias = {
          user: this.usuario_info.id_user,
          name: 'Mi historia',
          foto: this.usuario_info.url_foto_perfil,
          listaHistorias: null
        };
        this.socket.emit('ObtenerMisHistorias', this.sesionService.getIdCurrentUser());
        this.socket.fromEvent('CargarMisHistorias').subscribe(data => {
          this.mishistorias.listaHistorias = data;
        });
        this.modalService.dismissAll();
      } else {
        console.log("Error")
      }

    });
  }

  miHistoria(historia: HistoriaInterface): boolean {
    console.log(historia.visto)
    this.Todashistorias = historia;
    if (historia.visto === '0') {
      this.socket.emit('RegistrarVista', historia.id_historia, this.sesionService.getIdCurrentUser());
      this.socket.fromEvent('Registrado').subscribe(data => {
      });
      this.publicacionesService.verHistoria(historia.id_historia, historia.id_user);
      historia.visto = '1';
    }
    if (this.cantVistos != '0') {
      return true;
    } else {
      return false;
    }
  }

  ultimaHistoria(): string {
    this.lista.forEach(element => {
      this.id_slide = element.id_historia;
      if (element.visto === '0') {
        this.id_slide = element.id_historia;
        return element.id_historia;
      }
    });
    return this.id_slide;
  }

}


