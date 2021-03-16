import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { SesionService } from '../services/sesion.service';
import { HistoriaInterface } from '../models/historia-interface';
// import { CarouselComponent } from '../carousel/carousel.component';
import { NgbCarouselConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit {

  @Input() idUser: string;
  @Input() lista: HistoriaInterface[];
  @Input() foto: string;
  @Input() publicadaPor: string;
  @Input() cantVistos: string;

  opcionVisto = 'visto';
  tiempo = 'Justo Ahora';
  setInterval = 5000;
  slides: any;
  id_slide = '';

  constructor(private modalService: NgbModal, config: NgbCarouselConfig, private socket: Socket, private sesionService: SesionService) {
    config.interval = 15000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.wrap = false;
    this.tiempo = this.minutos_publicacion(0);
  }

  ngOnInit(): void {
    if (this.lista) {
      this.nuevo();
      this.ultimaHistoria();
    }
  }


  miHistoria(): boolean {
    if (this.cantVistos != '0') {
      return true;
    } else {
      return false;
    }
  }


  minutos_publicacion(minutos): string {
    if (minutos != '0') {
      return 'Hace ' + minutos + ' min';
    } else {
      return 'Justo ahora';
    }
  }

  nuevo(): void {
    if (this.lista) {
      this.lista.forEach(element => {
        if (element.visto === '0') {
          this.opcionVisto = 'nuevo';
        }
      });
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

  cambio(): void {
  }

  open() {
    if (this.lista != null) {
      const modalRef = this.modalService.open(ConfirmDialogComponent);
      modalRef.componentInstance.idUser = this.idUser;
      modalRef.componentInstance.lista = this.lista;
      modalRef.componentInstance.foto = this.foto;
      modalRef.componentInstance.publicadaPor = this.publicadaPor;
      modalRef.componentInstance.cantVistos = this.cantVistos;
    }
  }
}
