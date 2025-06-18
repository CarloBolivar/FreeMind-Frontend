import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartestrealizadoComponent } from "./listartestrealizado/listartestrealizado.component";

@Component({
  selector: 'app-testrealizado',
  imports: [RouterOutlet, ListartestrealizadoComponent],
  templateUrl: './testrealizado.component.html',
  styleUrl: './testrealizado.component.css'
})
export class TestrealizadoComponent {
  constructor(public route:ActivatedRoute){}
}
