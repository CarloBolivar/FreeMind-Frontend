import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarpago',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarpago.component.html',
  styleUrls: ['./buscarpago.component.css']
})
export class BuscarpagoComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  pagoBusqueda: number = 0;

  constructor(private pagoService: PagoService, private fb: FormBuilder) {
    this.form = fb.group({
      pago: ['']
    });
  }

  ngOnInit(): void {
    this.pagoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('pago')?.valueChanges.subscribe(value => {
      this.pagoBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.pagoBusqueda != 0) {
      this.pagoService.listId(this.pagoBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.pagoService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}
