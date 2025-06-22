import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HorarioService } from '../../../services/horario.service';
import { Horario } from '../../../models/horario';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarhorario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: '../insertareditar/insertareditar.component.html',
  styleUrls: ['../insertareditar/insertareditar.component.css']
})
export class InsertareditarhorarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  horario: Horario = {} as Horario;
  usuariosDisponibles: Usuario[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hS: HorarioService,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      idUsuario: ['', Validators.required],
      disponible: [true, Validators.required]
    });

    this.uS.list().subscribe((data: Usuario[]) => {
      this.usuariosDisponibles = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.horario = {
        idHorario: this.edicion ? this.id : 0,
        fecha: formValue.fecha,
        hora: formValue.hora,
        idUsuario: formValue.idUsuario,
        disponible: formValue.disponible,
        nombreUsuario: ''
      };

      const request = this.edicion
        ? this.hS.update(this.horario)
        : this.hS.insert(this.horario);

      request.subscribe(() => {
        this.router.navigate(['horarios']);
      });
    }
  }

  init(): void {
    if (this.edicion) {
      this.hS.listId(this.id).subscribe((data: Horario) => {
        this.form.setValue({
          fecha: data.fecha,
          hora: data.hora,
          idUsuario: data.idUsuario,
          disponible: data.disponible
        });
      });
    }
  }
}
