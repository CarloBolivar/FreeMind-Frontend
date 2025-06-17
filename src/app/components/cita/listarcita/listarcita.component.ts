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

  ngOnInit(): void {/*
    this.CitaService.list().subscribe(data => {
      this.dataSource = data;*/

  this.dataSource = [
    {
      idCita: 906,
      estado: 1,
      idHorario: 9013,
      idPaciente: 903,
      idPsicologo: 901,
      idTerapia: 990
    },
    {
      idCita: 907,
      estado: 2,
      idHorario: 9014,
      idPaciente: 904,
      idPsicologo: 902,
      idTerapia: 991
    },
    {
      idCita: 908,
      estado: 1,
      idHorario: 9015,
      idPaciente: 903,
      idPsicologo: 901,
      idTerapia: 992
    },
    {
      idCita: 909,
      estado: 2,
      idHorario: 9016,
      idPaciente: 904,
      idPsicologo: 902,
      idTerapia: 990
    }
  ];
  }

  eliminar(id: number) {
    this.CitaService.delete(id).subscribe(() => {
      this.CitaService.list().subscribe(data => {
        this.dataSource = data;
        this.CitaService.setList(data);
      });
    });
  }
}
