import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscarcomentario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './buscarcomentario.component.html',
  styleUrls: ['./buscarcomentario.component.css']
})
export class BuscarcomentarioComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  comentarioBusqueda: number = 0;

  constructor(private comentarioService: ComentarioService, private fb: FormBuilder) {
    this.form = fb.group({
      comentario: ['']
    });
  }

  ngOnInit(): void {
    this.comentarioService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('comentario')?.valueChanges.subscribe(value => {
      this.comentarioBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.comentarioBusqueda != 0) {
      this.comentarioService.listId(this.comentarioBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.comentarioService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}
