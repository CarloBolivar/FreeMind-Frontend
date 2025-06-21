import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Test } from '../../../models/test';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listartest',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './listartest.component.html',
  styleUrl: './listartest.component.css'
})
export class ListartestComponent implements OnInit {
  dataSource: MatTableDataSource<Test> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number): void {
    this.testService.delete(id).subscribe(() => {
      this.testService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }
}
