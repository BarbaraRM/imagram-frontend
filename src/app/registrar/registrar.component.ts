import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user = {
    user_gender: '',
    user_birth: '',
    nombres: '',
    apellidos: '',
    correo: '',
    usuario: '',
    password: '',
    telefono: '',
    id_ciudad: '',
    trabajo: '',
    estudio: '',
    biografia: ''
  };

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {

  }


  codigo;
  cont_codigo;
  cont_form;
  addUsuarios() {

    console.log(this.user)

    this.usuariosService.Registrar(this.user)
      .subscribe(res => {

        console.log(res)
        if (res.result === true) {
          this.codigo = res.codigo;
          var id_user = res.id_user;


          this.cont_form = document.getElementById('cont_form')
          this.cont_form.style.display = 'none'


          this.cont_codigo = document.getElementById('cont_codigo')
          this.cont_codigo.style.display = 'block'



        }
        //this.router.navigate(['wall']);
      }, err => console.log(err)
      )
  }

  txt_codigo;
  VerificarCodigo() {
    this.txt_codigo = document.getElementById('txt_codigo')
    this.txt_codigo = this.txt_codigo.value
    if (this.codigo === this.txt_codigo) {
      this.router.navigate(['login']);
      console.log('los codigos coinciden')
    }
  }

  Omitir() {
    this.router.navigate(['login']);
  }
}