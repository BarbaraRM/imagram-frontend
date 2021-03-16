import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'

@Component({
  selector: 'cambiarcontra',
  templateUrl: './cambiarcontra.component.html',
  styleUrls: ['./cambiarcontra.component.css']
})
export class cambiarcontra implements OnInit {

  constructor(private sesionService: SesionService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {

    if (this.sesionService.getvalidarContra() === null) {
      this.router.navigate(['/recuperar']);
    }

  }

  Validarcontra1() {
    this.a_contra = document.getElementById('ncontra')
    var dato = this.a_contra.value
    if (dato === "") {
      this.a_contra.style.cssText = 'border-color: #FF0000;'
    } else {
      this.a_contra.style.cssText = 'border-color: #008f39;'
    }
  }
  v_btn;

  Validarcontra2() {
    this.v_btn = document.getElementById('btn_guardarc')
    this.a_contra = document.getElementById('ncontra')
    this.a_contra_r = document.getElementById('rcontra')
    var dato = this.a_contra.value
    var dato2 = this.a_contra_r.value
    if (dato !== dato2) {
      this.a_contra_r.style.cssText = 'border-color: #FF0000;'
      this.v_btn.disabled = true
    } else {
      this.a_contra_r.style.cssText = 'border-color: #008f39;'
      this.v_btn.disabled = false
    }
  }


  a_contra;
  a_contra_r;
  AgregarContrasena() {
    this.a_contra = document.getElementById('ncontra')
    this.a_contra = this.a_contra.value
    this.a_contra_r = document.getElementById('rcontra')
    this.a_contra_r = this.a_contra_r.value

    this.usuarioService.CambiarContra(this.sesionService.getIdValidado(), this.a_contra).subscribe(respuesta => {
      if (respuesta.result) {
        localStorage.removeItem('validarC');
        localStorage.removeItem('idvalidado');
        this.router.navigate(['/']);
      } else {
        console.log("AQUI")
      }
    });
  }

}
