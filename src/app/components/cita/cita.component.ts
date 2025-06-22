import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {
  constructor(public route: ActivatedRoute) {}
}
