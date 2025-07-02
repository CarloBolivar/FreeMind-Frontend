import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarusuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarusuario.component.html',
  styleUrls: ['./buscarusuario.component.css']
})
export class BuscarusuarioComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  usuarioBusqueda: number = 0;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.form = fb.group({
      usuario: ['']
    });
  }

  ngOnInit(): void {
    this.usuarioService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('usuario')?.valueChanges.subscribe(value => {
      this.usuarioBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.usuarioBusqueda != 0) {
      this.usuarioService.listId(this.usuarioBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.usuarioService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}
