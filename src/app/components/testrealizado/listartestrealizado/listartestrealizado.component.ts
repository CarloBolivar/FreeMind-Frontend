import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TestRealizado } from '../../../models/testrealizado';
import { TestrealizadoService } from '../../../services/testrealizado.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listartestrealizado',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './listartestrealizado.component.html',
  styleUrls: ['./listartestrealizado.component.css']
})
export class ListartestrealizadoComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  dataSource = new MatTableDataSource<TestRealizado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private testRealizadoService: TestrealizadoService) {}

  ngOnInit(): void {
    this.testRealizadoService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.testRealizadoService.list().subscribe(data => {
      this.testRealizadoService.setList(data);
    });
  }

  eliminar(id: number): void {
    this.testRealizadoService.delete(id).subscribe(() => {
      this.testRealizadoService.list().subscribe(data => {
        this.testRealizadoService.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
