import { Component, OnInit, ViewChild } from '@angular/core';
import { RespuestaTest } from '../../../models/respuestatest';
import { RespuestaTestService } from '../../../services/respuestatest.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarrespuestatest',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './listarrespuestatest.component.html',
  styleUrls: ['./listarrespuestatest.component.css']
})
export class ListarrespuestatestComponent implements OnInit {
  dataSource = new MatTableDataSource<RespuestaTest>();
  displayedColumns: string[] = ['idRespuesta', 'respuesta', 'idPregunta', 'idUsuario', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private respuestaTestService: RespuestaTestService) {}

  ngOnInit(): void {
    this.respuestaTestService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.respuestaTestService.delete(id).subscribe(() => {
      this.respuestaTestService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
