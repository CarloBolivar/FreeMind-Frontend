import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarcita',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditar.component.html',
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditarcitaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cita: Cita = {} as Cita;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: CitaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      estado: ['', Validators.required],
      idHorario: ['', Validators.required],
      idPaciente: ['', Validators.required],
      idPsicologo: ['', Validators.required],
      idTerapia: ['']
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.cita.idCita = this.form.value.codigo;
      this.cita.estado = this.form.value.estado;
      this.cita.idHorario = this.form.value.idHorario;
      this.cita.idPaciente = this.form.value.idPaciente;
      this.cita.idPsicologo = this.form.value.idPsicologo;
      this.cita.idTerapia = this.form.value.idTerapia;

      if (this.edicion) {
        this.cS.update(this.cita).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.cita).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['citas']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCita),
          estado: new FormControl(data.estado),
          idHorario: new FormControl(data.idHorario),
          idPaciente: new FormControl(data.idPaciente),
          idPsicologo: new FormControl(data.idPsicologo),
          idTerapia: new FormControl(data.idTerapia)
        });
      });
    }
  }
}
