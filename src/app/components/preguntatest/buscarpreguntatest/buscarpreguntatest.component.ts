import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PreguntaTest } from '../../../models/preguntatest';
import { PreguntaTestService } from '../../../services/preguntatest.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarpreguntatest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarpreguntatest.component.html',
  styleUrls: ['./buscarpreguntatest.component.css']
})
export class BuscarpreguntatestComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: MatTableDataSource<PreguntaTest> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  preguntaBusqueda: number = 0;

  constructor(private preguntaService: PreguntaTestService, private fb: FormBuilder) {
    this.form = fb.group({
      pregunta: ['']
    });
  }

  ngOnInit(): void {
    this.preguntaService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('pregunta')?.valueChanges.subscribe(value => {
      this.preguntaBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.preguntaBusqueda != 0) {
      this.preguntaService.listId(this.preguntaBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.preguntaService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}
