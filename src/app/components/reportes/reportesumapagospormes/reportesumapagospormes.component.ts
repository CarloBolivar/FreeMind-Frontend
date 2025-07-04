import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PagoService } from '../../../services/pago.service';
import { CantidadSumaPagosPorMesDTO } from '../../../models/cantidadsumapagospormesDTO';

@Component({
  selector: 'app-reportesumapagospormes',
  standalone: true,
  templateUrl: './reportesumapagospormes.component.html',
  styleUrls: ['./reportesumapagospormes.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReportesumapagospormesComponent implements OnInit {
  displayedColumns: string[] = ['mes', 'montoTotal'];
  dataSource: MatTableDataSource<CantidadSumaPagosPorMesDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.obtenerSumaPagosPorMes().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
