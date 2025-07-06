import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { HorarioService } from '../../../services/horario.service';
import { Horario } from '../../../models/horario';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-buscarhorario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './buscarhorario.component.html',
  styleUrls: ['./buscarhorario.component.css']
})
export class BuscarhorarioComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Horario> = new MatTableDataSource();
  form: FormGroup;
  horarioBusqueda: number = 0;
  notResults: boolean = false;

  constructor(private horarioService: HorarioService, private fb: FormBuilder) {
    this.form = fb.group({
      horario: ['']
    });
  }

  ngOnInit(): void {
    this.cargarTablaCompleta();

    this.form.get('horario')?.valueChanges.subscribe(value => {
      this.horarioBusqueda = Number(value);
      this.buscar();
    });
  }

  buscar() {
    if (!this.horarioBusqueda || this.horarioBusqueda <= 0) {
      this.cargarTablaCompleta();
      return;
    }

    this.horarioService.listId(this.horarioBusqueda).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = false;
      } else {
        this.dataSource = new MatTableDataSource();
        this.notResults = true;
      }
    }, error => {
      this.dataSource = new MatTableDataSource();
      this.notResults = true;
    });
  }

  cargarTablaCompleta() {
    this.horarioService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.notResults = false;
    });
  }
}
