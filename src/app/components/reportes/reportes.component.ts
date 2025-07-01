import { Component } from '@angular/core';
import { ReportecantidadcitasporterapiaComponent } from "./reportecantidadcitasporterapia/reportecantidadcitasporterapia.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet,ReportecantidadcitasporterapiaComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
 constructor(public route:ActivatedRoute){}
}
