import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CantidadUsuariosPorRolDTO } from '../../../models/cantidadusuariosporrolDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuariorollistar',
  imports: [CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule],
  templateUrl: './reporteusuariorollistar.component.html',
  styleUrl: './reporteusuariorollistar.component.css'
})
export class ReporteusuariorollistarComponent implements OnInit{

  displayedColumns: string[] = ['rol', 'cantidad'];
  dataSource: MatTableDataSource<CantidadUsuariosPorRolDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listRoles().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
