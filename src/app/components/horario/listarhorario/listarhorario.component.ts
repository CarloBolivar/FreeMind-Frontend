import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarioService } from '../../../services/horario.service';
import { Horario } from '../../../models/horario';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarhorario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './listarhorario.component.html',
  styleUrls: ['./listarhorario.component.css']
})
export class ListarhorarioComponent implements OnInit {
  dataSource: Horario[] = [];
  displayedColumns: string[] = ['idHorario', 'fecha', 'hora', 'idUsuario', 'disponible', 'acciones'];

  constructor(private hS: HorarioService) {}

  ngOnInit(): void {
    this.hS.list().subscribe(data => {
      this.dataSource = data;
    });
  }

  eliminar(id: number): void {
    this.hS.delete(id).subscribe(() => {
      this.hS.list().subscribe(data => {
        this.dataSource = data;
      });
    });
  }
}
