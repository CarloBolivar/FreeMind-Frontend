import { Component } from '@angular/core';
import { ListartestrealizadoComponent } from "./listartestrealizado/listartestrealizado.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-testrealizado',
  imports: [
    RouterOutlet,
    ListartestrealizadoComponent],
  templateUrl: './testrealizado.component.html',
  styleUrl: './testrealizado.component.css'
})
export class TestrealizadoComponent {
  constructor(public route:ActivatedRoute){}
}
