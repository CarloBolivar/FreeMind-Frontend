import { Component } from '@angular/core';
import { ListarrecursoComponent } from "./listarrecurso/listarrecurso.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recurso',
  imports: [
    RouterOutlet,
    ListarrecursoComponent],
  templateUrl: './recurso.component.html',
  styleUrl: './recurso.component.css'
})
export class RecursoComponent {
  constructor(public route:ActivatedRoute){}
}
