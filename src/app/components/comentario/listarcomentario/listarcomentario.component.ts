import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-listarcomentario',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatSortModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent implements OnInit{
  displayedColumns: string[] = ['c1','c2','c3','c4','c5'];
  dataSource:MatTableDataSource<Comentario>=new MatTableDataSource()

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cS:ComentarioService){}

  ngOnInit(): void {
  this.cS.list().subscribe(data => {
    data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    this.dataSource = new MatTableDataSource(data);

    //
    setTimeout(() => {
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'c4') return new Date(item.fecha);
        return (item as any)[property];
      };

      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.sort.active = 'c4';
        this.sort.direction = 'desc';
        this.sort.sortChange.emit();
      }
    });
  });
}
}
