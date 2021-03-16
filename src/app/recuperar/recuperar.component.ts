import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'


@Component({
  selector: 'recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class recuperar implements OnInit {

  constructor(private sesionService: SesionService, private usuarioService: UsuariosService, private router: Router) { }
  codigo;
  ngOnInit(): void {



  }

  regresar() {
    this.router.navigate(['/']);
  }
v_cd;


  vali_cd;
  ValidarCodigo() {
    this.vali_cd = document.getElementById('codigo')
    this.vali_cd = this.vali_cd.value
    var lb = document.getElementById('textoerror')
    if (this.codigo === this.vali_cd) {
      lb.innerHTML = "TU CODIGO SE HA VALIDADO"
      lb.style.cssText = 'color:#008f39;';
      var bt1 = document.getElementById('btn_validar')
      var bt2 = document.getElementById('btn_abrir')
      bt1.hidden = true;
      bt2.hidden = false;
      localStorage.setItem('validarC', "true");
      var user = this.v_iduser
      localStorage.setItem('idvalidado', user)
    } else {
      lb.innerHTML = "EL CODIGO ES INCORRECTO"
      lb.style.cssText = 'color:#FF0000;';
    }
  }

  v_iduser;


  Abrir() {
    this.router.navigate(['contra'])
  }

  v_correo;
  ValidarCorreo() {
    var lb = document.getElementById('textoerror2')
    this.v_correo = document.getElementById('correo')
    var correo = this.v_correo.value
    this.usuarioService.CorreoExiste(correo).subscribe(respuesta => {
      if (respuesta.result === "true") {
        lb.innerHTML = "TU CORREO SE HA VALIDADO"
        lb.style.cssText = 'color:#008f39;';
        var bt1 = document.getElementById('btn_validarcorreo')
        var bt2 = document.getElementById('btn_enviar')
        bt1.hidden = true;
        bt2.hidden = false;
        this.v_correo.disabled =true;

        this.v_iduser = JSON.stringify(respuesta.id);
      } else {
        lb.innerHTML = "EL CORREO ES INCORRECTO"
        lb.style.cssText = 'color:#FF0000;';
      }
    });
  }

  h_correo;
  h_btn;
  HabilitarBoton() {
    this.h_correo = document.getElementById('correo')
    this.h_correo = this.h_correo.value
    this.h_btn = document.getElementById('btn_validarcorreo')
    if (this.h_correo === "") {

      this.h_btn.disabled = true
    } else {

      this.h_btn.disabled = false
    }
  }
  e_correo;
  EnviarCorreo() {
    this.e_correo = document.getElementById('correo')
    this.e_correo = this.e_correo.value
    this.usuarioService.EnviarCorreoRecuperar(this.e_correo).subscribe(respuesta => {
      if (respuesta.result) {
        this.codigo = respuesta.codigo;
      } else {
        console.log("Error")
      }

    });
  }
}
