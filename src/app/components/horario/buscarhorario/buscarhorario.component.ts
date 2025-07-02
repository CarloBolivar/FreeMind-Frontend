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
  usuarioBusqueda: number = 0;
  notResults: boolean = false;

  constructor(private horarioService: HorarioService, private fb: FormBuilder) {
    this.form = fb.group({
      usuario: ['']
    });
  }

  ngOnInit(): void {
    this.horarioService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('usuario')?.valueChanges.subscribe(value => {
      this.usuarioBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.usuarioBusqueda != 0) {
      this.horarioService.list().subscribe(data => {
        const filtrados = data.filter(h => h.idUsuario === this.usuarioBusqueda);
        this.dataSource = new MatTableDataSource(filtrados);
        this.notResults = filtrados.length === 0;
      });
    } else {
      this.horarioService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}
