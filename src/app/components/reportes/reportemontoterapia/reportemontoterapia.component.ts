import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PagoService } from '../../../services/pago.service';
import { CantidadMontoPorTipoDeTerapiaDTO } from '../../../models/cantidadmontoportipodeterapiaDTO';

@Component({
  selector: 'app-reportemontoterapia',
  standalone: true,
  templateUrl: './reportemontoterapia.component.html',
  styleUrls: ['./reportemontoterapia.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReportemontoterapiaComponent implements OnInit {
  displayedColumns: string[] = ['tipoTerapia', 'montoTotal'];
  dataSource: MatTableDataSource<CantidadMontoPorTipoDeTerapiaDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.obtenerMontoPorTipoDeTerapia().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
