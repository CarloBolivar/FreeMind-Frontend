import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HorarioService } from '../../../services/horario.service';
import { Horario } from '../../../models/horario';

@Component({
  selector: 'app-reportecantidadhorariosdisponibles',
  standalone: true,
  templateUrl: './reportecantidadhorariosdisponibles.component.html',
  styleUrls: ['./reportecantidadhorariosdisponibles.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReportecantidadhorariosdisponiblesComponent implements OnInit {
  horariosDisponibles: Horario[] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    this.horarioService.listAllDisponibles().subscribe({
      next: (data) => {
        this.horariosDisponibles = data;
      }
    });
  }
}
