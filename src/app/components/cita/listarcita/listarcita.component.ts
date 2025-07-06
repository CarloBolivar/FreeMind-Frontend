import { Component, OnInit, ViewChild } from '@angular/core';
import { Cita } from '../../../models/cita';
import { Usuario } from '../../../models/usuario';
import { Horario } from '../../../models/horario';
import { Terapia } from '../../../models/terapia';
import { CitaService } from '../../../services/cita.service';
import { UsuarioService } from '../../../services/usuario.service';
import { HorarioService } from '../../../services/horario.service';
import { TerapiaService } from '../../../services/terapia.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { CitaEnriquecida } from '../../../models/citaNombres';

@Component({
  selector: 'app-listarcita',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './listarcita.component.html',
  styleUrls: ['./listarcita.component.css']
})
export class ListarcitaComponent implements OnInit {
  dataSource: MatTableDataSource<CitaEnriquecida> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'paciente', 'psicologo', 'horario', 'estado', 'terapia', 'editar', 'eliminar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usuarios: Usuario[] = [];
  horarios: Horario[] = [];
  terapias: Terapia[] = [];

  constructor(
    private citaService: CitaService,
    private usuarioService: UsuarioService,
    private horarioService: HorarioService,
    private terapiaService: TerapiaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.usuarioService.list().subscribe(users => {
      this.usuarios = users;

      this.horarioService.list().subscribe(horarios => {
        this.horarios = horarios;

        this.terapiaService.list().subscribe(terapias => {
          this.terapias = terapias;

          this.citaService.list().subscribe((citas: Cita[]) => {
            const enriquecidas: CitaEnriquecida[] = citas.map(c => {
              const paciente = this.usuarios.find(u => u.idUsuario === c.idPaciente);
              const psicologo = this.usuarios.find(u => u.idUsuario === c.idPsicologo);
              const horario = this.horarios.find(h => h.idHorario === c.idHorario);
              const terapia = this.terapias.find(t => t.idTerapia === c.idTerapia);

              return {
                idCita: c.idCita,
                nombrePaciente: paciente ? `${paciente.nombre} ${paciente.apellido}` : 'N/A',
                nombrePsicologo: psicologo ? `${psicologo.nombre} ${psicologo.apellido}` : 'N/A',
                horario: horario ? `${horario.fecha} ${horario.hora}` : 'N/A',
                estado: c.estado,
                terapia: terapia ? terapia.titulo : 'No asignada'
              };
            });

            this.dataSource = new MatTableDataSource(enriquecidas);
            this.dataSource.paginator = this.paginator;
          });
        });
      });
    });
  }

  eliminar(id: number): void {
    this.citaService.delete(id).subscribe(() => {
      this.cargarDatos();
    });
  }

  getNombreEstado(estado: number): string {
    switch (estado) {
      case 0: return 'Registrada';
      case 1: return 'Confirmada';
      case 2: return 'Atendida';
      case 3: return 'Cancelada por paciente';
      case 4: return 'Cancelada por psicólogo';
      case 5: return 'No asistió';
      default: return 'Desconocido';
    }
  }
}
