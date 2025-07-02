import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RespuestaTest } from '../../../models/respuestatest';
import { RespuestaTestService } from '../../../services/respuestatest.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarrespuestatest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarrespuestatest.component.html',
  styleUrls: ['./buscarrespuestatest.component.css']
})
export class BuscarrespuestatestComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<RespuestaTest> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  respuestaBusqueda: number = 0;

  constructor(private respuestaService: RespuestaTestService, private fb: FormBuilder) {
    this.form = fb.group({
      respuesta: ['']
    });
  }

  ngOnInit(): void {
    this.respuestaService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('respuesta')?.valueChanges.subscribe(value => {
      this.respuestaBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.respuestaBusqueda != 0) {
      this.respuestaService.listId(this.respuestaBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.respuestaService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}
