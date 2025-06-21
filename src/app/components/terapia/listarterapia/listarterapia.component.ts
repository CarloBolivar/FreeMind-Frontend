import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TerapiaService } from '../../../services/terapia.service';
import { Terapia } from '../../../models/terapia';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarterapia',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './listarterapia.component.html',
  styleUrl: './listarterapia.component.css'
})
export class ListarterapiaComponent implements OnInit {
  dataSource: MatTableDataSource<Terapia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private terapiaService: TerapiaService) {}

  ngOnInit(): void {
    this.terapiaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number): void {
    this.terapiaService.eliminar(id).subscribe(() => {
      this.terapiaService.listar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }
}
