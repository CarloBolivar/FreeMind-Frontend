import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpreguntatestComponent } from "./listarpreguntatest/listarpreguntatest.component";

@Component({
  selector: 'app-preguntatest',
  imports: [RouterOutlet, ListarpreguntatestComponent],
  templateUrl: './preguntatest.component.html',
  styleUrl: './preguntatest.component.css'
})
export class PreguntatestComponent {
  constructor(public route: ActivatedRoute) {}
}
