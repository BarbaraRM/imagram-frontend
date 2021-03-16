import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from '../../app/services/publicaciones.service';
import { Socket } from 'ngx-socket-io';
import { SesionService } from '../services/sesion.service';
import { HistoriaInterface, ListaHistInterface } from '../models/historia-interface';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sesionService: SesionService, private PublicacionesServive: PublicacionesService, private usuarioServices: UsuariosService,
    private socket: Socket, private router: Router) { }

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
    if (this.sesionService.getIdCurrentUser() === null) {
      this.router.navigate(['/']);
    } else {
      // obtener el usuario
      this.usuario_info = this.sesionService.getInfoCurrentUser();
      this.id_user_current = this.sesionService.getUsernameCurrentUser();
      var id_user = this.sesionService.getIdCurrentUser()


      this.TraerSugerencias();

      // seccion para publicaciones
      this.socket.emit('ObtenerPublicaciones', this.sesionService.getIdCurrentUser());
      this.socket.fromEvent('CargarPublicaciones').subscribe(data => {
        this.publicaciones = data;
      });

      this.socket.emit('ObtenerHistorias', this.sesionService.getIdCurrentUser());
      this.socket.fromEvent('CargarHistorias').subscribe(data => {
        this.dataSource = data;
        let usuario = '';
        let nombre = '';
        let fotoP = '';
        this.historia_list = new Array();

        this.dataSource.forEach(element => {
          if (usuario === '') {
            usuario = element.id_user;
            nombre = element.publicada_por;
            fotoP = element.url_foto_perfil;
          }
          if (element.id_user === usuario) {
            this.historia_list.push(element);
          } else {
            this.historias.push({
              user: usuario,
              name: nombre,
              foto: fotoP,
              listaHistorias: this.historia_list
            });
            usuario = element.id_user;
            nombre = element.publicada_por;
            fotoP = element.url_foto_perfil;
            this.historia_list = new Array();
            this.historia_list.push(element);
          }
        });
        if (this.dataSource.length != 0) {
          this.historias.push({
            user: usuario,
            name: nombre,
            foto: fotoP,
            listaHistorias: this.historia_list
          });
        }
        console.log("todas las historias2", this.historias);
      });
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
        console.log('mis historias', this.mishistorias);
      });

    }

  }

  historiasFuncion(): void {
    // seccion para historias

  }


  TraerSugerencias() {
    var id_user = this.sesionService.getIdCurrentUser()
    this.usuarioServices.Sugerencias(id_user).subscribe(resultado => {
      //alert(resultado)
      if (resultado.result === true) {
        this.lista_sugerencias = resultado.data
        console.log(resultado.data)
      } else {
        alert(resultado.data)
      }
    })
  }
}
