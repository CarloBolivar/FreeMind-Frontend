import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntaTest } from '../../../models/preguntatest';
import { PreguntaTestService } from '../../../services/preguntatest.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarpreguntatest',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './listarpreguntatest.component.html',
  styleUrls: ['./listarpreguntatest.component.css']
})
export class ListarpreguntatestComponent implements OnInit {
  dataSource = new MatTableDataSource<PreguntaTest>();
  displayedColumns: string[] = ['idPregunta', 'pregunta', 'idTest', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private preguntaTestService: PreguntaTestService) {}

  ngOnInit(): void {
    this.preguntaTestService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.preguntaTestService.delete(id).subscribe(() => {
      this.preguntaTestService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
