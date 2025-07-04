import { Component, OnInit, ViewChild } from '@angular/core';
import { ComentarioService } from '../../../services/comentario.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CantidadComentariosPorUsuarioDTO } from '../../../models/cantidadcomentariosporusuarioDTO';

@Component({
  selector: 'app-reportecomentariousuario',
  standalone: true,
  templateUrl: './reportecomentariousuario.component.html',
  styleUrls: ['./reportecomentariousuario.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReportecomentariousuarioComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'cantidad'];
  dataSource: MatTableDataSource<CantidadComentariosPorUsuarioDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.comentarioService.cantidadComentariosPorUsuario().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
