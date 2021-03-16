import { Component, OnInit } from '@angular/core';
import { Navbar2Component } from '../navbar2/navbar2.component'
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
    if (this.sesionService.getIdCurrentUser() === null) {
      this.router.navigate(['/']);
    }
  }


  /*cambiarModo() {
    var cuerpoweb = document.body;
    cuerpoweb.classList.toggle("oscuro");
  }*/


}
