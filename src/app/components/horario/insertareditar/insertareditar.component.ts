import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HorarioService } from '../../../services/horario.service';
import { Horario } from '../../../models/horario';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarhorario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: '../insertareditar/insertareditar.component.html',
  styleUrls: ['../insertareditar/insertareditar.component.css']
})
export class InsertareditarhorarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  horario: Horario = {} as Horario;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hS: HorarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idHorario: [''],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      idUsuario: ['', Validators.required],
      disponible: [true, Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.horario = this.form.value;

      if (this.edicion) {
        this.hS.update(this.horario).subscribe(() => {
          this.router.navigate(['horarios']);
        });
      } else {
        this.hS.insert(this.horario).subscribe(() => {
          this.router.navigate(['horarios']);
        });
      }
    }
  }

  init(): void {
  if (this.edicion) {
    this.hS.listId(this.id).subscribe((data: Horario) => {
      this.form.setValue({
        idHorario: data.idHorario,
        fecha: data.fecha,
        hora: data.hora,
        idUsuario: data.idUsuario,
        disponible: data.disponible
      });
    });
  }
}

}
