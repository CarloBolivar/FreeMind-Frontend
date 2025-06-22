import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { UsuarioService } from '../../../services/usuario.service';
import { HorarioService } from '../../../services/horario.service';
import { TerapiaService } from '../../../services/terapia.service';
import { Usuario } from '../../../models/usuario';
import { Horario } from '../../../models/horario';
import { Terapia } from '../../../models/terapia';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-insertareditarcita',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrls: ['./insertareditar.component.css'],
})
export class InsertareditarcitaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cita: Cita = {} as Cita;

  pacientes: Usuario[] = [];
  psicologos: Usuario[] = [];
  horarios: Horario[] = [];
  terapias: Terapia[] = [];
  isSubmitting: boolean = false;


  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: CitaService,
    private usuarioService: UsuarioService,
    private horarioService: HorarioService,
    private terapiaService: TerapiaService,
    private router: Router,
    private route: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      estado: ['', Validators.required],
      idHorario: ['', Validators.required],
      idPaciente: ['', Validators.required],
      idPsicologo: ['', Validators.required],
      idTerapia: ['']
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // Cargar pacientes y psicólogos
    this.usuarioService.listarPacientes().subscribe(data => this.pacientes = data);
    this.usuarioService.listarPsicologos().subscribe(data => this.psicologos = data);
    this.terapiaService.list().subscribe(data => this.terapias = data);

    // Escuchar cambios en el psicólogo y filtrar horarios disponibles
    this.form.get('idPsicologo')?.valueChanges.subscribe(id => {
      if (id) {
        this.horarioService.listAvailableByPsicologo(id).subscribe(data => {
          this.horarios = data;
          this.form.get('idHorario')?.setValue('');
        });
      }
    });
  }

  aceptar(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched(); // Marca los campos en rojo si están vacíos
    return;
  }

  this.isSubmitting = true; // Desactiva el botón mientras envía

  this.cita.idCita = this.form.value.codigo;
  this.cita.estado = this.form.value.estado;
  this.cita.idHorario = this.form.value.idHorario;
  this.cita.idPaciente = this.form.value.idPaciente;
  this.cita.idPsicologo = this.form.value.idPsicologo;
  this.cita.idTerapia = this.form.value.idTerapia;

  const op = this.edicion ? this.cS.update(this.cita) : this.cS.insert(this.cita);
  op.subscribe(() => {
    this.router.navigate(['citas']);
    this.isSubmitting = false;
  }, () => {
    this.isSubmitting = false; // Por si hay error
  });
}

  init(): void {
  if (this.edicion) {
    this.cS.listId(this.id).subscribe((data: Cita) => {
      this.form.setValue({
        codigo: data.idCita,
        estado: data.estado,
        idHorario: data.idHorario,
        idPaciente: data.idPaciente,
        idPsicologo: data.idPsicologo,
        idTerapia: data.idTerapia
      });

      // Obtener los horarios disponibles de ese psicólogo
      this.horarioService.listAvailableByPsicologo(data.idPsicologo).subscribe(horariosDisponibles => {
        // También agrega el horario actualmente asignado si no está disponible
        this.horarioService.listId(data.idHorario).subscribe(horarioActual => {
          const yaIncluido = horariosDisponibles.some(h => h.idHorario === horarioActual.idHorario);
          if (!yaIncluido) {
            horariosDisponibles.push(horarioActual);
          }
          this.horarios = horariosDisponibles;
        });
      });
    });
  }
}
}
