import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarterapiaComponent } from './listarterapia/listarterapia.component';

@Component({
  selector: 'app-terapia',
  standalone: true,
  imports: [RouterOutlet, ListarterapiaComponent],
  templateUrl: './terapia.component.html',
  styleUrl: './terapia.component.css'
})
export class TerapiaComponent {
  constructor(public route: ActivatedRoute) {}
}
