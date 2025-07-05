import { CantidadRecursosPorTerapiaDTO } from './../../../models/CantidadRecursosPorTerapiaDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RecursoService } from '../../../services/recurso.service';

@Component({
  selector: 'app-reporterecursoterapia',
  standalone: true,
  templateUrl: './reporterecursoterapia.component.html',
  styleUrls: ['./reporterecursoterapia.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReporterecursoterapiaComponent implements OnInit {
  displayedColumns: string[] = ['tipoTerapia', 'cantidadRecursos'];
  dataSource: MatTableDataSource<CantidadRecursosPorTerapiaDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.recursoService.cantidadRecursosPorTerapia().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
