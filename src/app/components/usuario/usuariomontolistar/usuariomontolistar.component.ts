import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CantidadSumaPagoDTO } from '../../../models/cantidadSumaPagoDTO';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuariomontolistar',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './usuariomontolistar.component.html',
  styleUrls: ['./usuariomontolistar.component.css']
})
export class UsuariomontolistarComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'monto'];
  dataSource: MatTableDataSource<CantidadSumaPagoDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listMontoTotalPorUsuario().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}

