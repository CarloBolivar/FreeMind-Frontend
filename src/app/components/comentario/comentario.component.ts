import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';

@Component({
  selector: 'app-comentario',
  imports: [RouterOutlet, ListarcomentarioComponent],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {
  constructor(public route:ActivatedRoute){}
}