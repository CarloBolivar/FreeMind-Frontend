import { Component, OnInit, ViewChild } from '@angular/core';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

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
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'paciente', 'psicologo', 'horario', 'estado', 'terapia', 'editar', 'eliminar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.list().subscribe((data: Cita[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.citaService.delete(id).subscribe(() => {
      this.citaService.list().subscribe((data: Cita[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
