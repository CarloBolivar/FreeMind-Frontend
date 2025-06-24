import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrespuestatestComponent } from './listarrespuestatest/listarrespuestatest.component';

@Component({
  selector: 'app-respuestatest',
  imports: [RouterOutlet, ListarrespuestatestComponent],
  templateUrl: './respuestatest.component.html',
  styleUrl: './respuestatest.component.css'
})
export class RespuestatestComponent {
  constructor(public route: ActivatedRoute) {}
}
