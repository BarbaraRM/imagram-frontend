import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service'
import { UsuariosService } from '../services/usuarios.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sesionService: SesionService, private router: Router, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    if (this.sesionService.getIdCurrentUser() !== null) {
      this.router.navigate(['/home']);
    }
  }

  usuario: ''
  password: ''
  modal_estado;

  LoguearUsuario() {

    console.log(this.usuario, this.password);


    this.sesionService.login(this.usuario, this.password).subscribe(res => {

      if (res.result === true) {

        this.usuariosService.ValidarCuenta(res.user.id_user).subscribe(validacion => {
          const user = JSON.stringify(res.user);
          localStorage.setItem('userID', user)

          if (validacion.estado === 'ACTIVA') {
            console.log(res)
            localStorage.setItem('token', res.token);

            const user = JSON.stringify(res.user);
            localStorage.setItem('userID', user)

            this.router.navigate(['home']);
          } else {
            this.router.navigate(['estadocuenta']);
          }
        })

      } else {
        alert('Usuario o contraseña no validos')
      }

    },
      err => console.log(err)
    )
  }




}
