import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { Test } from '../../../models/test';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-listartest',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './listartest.component.html',
  styleUrls: ['./listartest.component.css']
})
export class ListartestComponent implements OnInit {
  dataSource: MatTableDataSource<Test> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDatos();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.testService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.testService.delete(id).subscribe(() => {
      this.cargarDatos();
    });
  }
}
