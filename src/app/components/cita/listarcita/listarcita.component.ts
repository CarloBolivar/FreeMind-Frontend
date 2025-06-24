import { Component, OnInit } from '@angular/core';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarcita',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './listarcita.component.html',
  styleUrls: ['./listarcita.component.css']
})
export class ListarcitaComponent implements OnInit {
  dataSource: Cita[] = [];
  displayedColumns: string[] = ['id', 'paciente', 'psicologo', 'horario', 'estado', 'terapia', 'editar', 'eliminar'];

  constructor(private CitaService: CitaService) {}

  ngOnInit(): void {
    this.CitaService.list().subscribe((data: Cita[]) => {
      this.dataSource = data;
    });
  }

  eliminar(id: number): void {
    this.CitaService.delete(id).subscribe(() => {
      this.CitaService.list().subscribe((data: Cita[]) => {
        this.dataSource = data;
      });
    });
  }
}