import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcitaComponent } from "./listarcita/listarcita.component";

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [RouterOutlet, ListarcitaComponent],
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {
  constructor(public route: ActivatedRoute) {}
}
