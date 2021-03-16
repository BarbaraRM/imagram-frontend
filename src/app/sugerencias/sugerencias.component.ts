import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {


  @Input() nombres: string;
  @Input() usuario: string;
  @Input() foto: string;

  constructor() { }

  ngOnInit(): void {
  }

}
