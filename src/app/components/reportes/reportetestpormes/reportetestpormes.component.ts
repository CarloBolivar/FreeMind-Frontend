import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CantidadTestsPorMesDTO } from '../../../models/cantidadtestspormesDTO';
import { TestrealizadoService } from '../../../services/testrealizado.service';

@Component({
  selector: 'app-reportetestmes',
  standalone: true,
  templateUrl: './reportetestpormes.component.html',
  styleUrls: ['./reportetestpormes.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReportetestmesComponent implements OnInit {
  displayedColumns: string[] = ['mes', 'cantidadTests'];
  dataSource: MatTableDataSource<CantidadTestsPorMesDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private testRealizadoService: TestrealizadoService) {}

  ngOnInit(): void {
    this.testRealizadoService.obtenerCantidadTestsPorMes().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
