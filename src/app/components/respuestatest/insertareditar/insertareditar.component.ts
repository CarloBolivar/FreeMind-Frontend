import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RespuestaTest } from '../../../models/respuestatest';
import { PreguntaTest } from '../../../models/preguntatest';
import { Usuario } from '../../../models/usuario';
import { RespuestaTestService } from '../../../services/respuestatest.service';
import { PreguntaTestService } from '../../../services/preguntatest.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarespuestatest',
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
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditarrespuestatestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  respuestaTest: RespuestaTest = { idRespuesta: 0, respuesta: '', idPregunta: 0, idUsuario: 0 };

  id: number = 0;
  edicion: boolean = false;

  listaPreguntas: PreguntaTest[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private respuestaTestService: RespuestaTestService,
    private preguntaTestService: PreguntaTestService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idRespuesta: [{ value: '', disabled: true }],
      respuesta: ['', Validators.required],
      idPregunta: ['', Validators.required],
      idUsuario: ['', Validators.required]
    });

    this.preguntaTestService.list().subscribe(data => {
      this.listaPreguntas = data;
    });

    this.usuarioService.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.respuestaTest.idRespuesta = this.form.get('idRespuesta')?.value;
      this.respuestaTest.respuesta = this.form.get('respuesta')?.value;
      this.respuestaTest.idPregunta = this.form.get('idPregunta')?.value;
      this.respuestaTest.idUsuario = this.form.get('idUsuario')?.value;

      if (this.edicion) {
        this.respuestaTestService.update(this.respuestaTest).subscribe(() => {
          this.respuestaTestService.list().subscribe();
        });
      } else {
        this.respuestaTestService.insert(this.respuestaTest).subscribe(() => {
          this.respuestaTestService.list().subscribe();
        });
      }

      this.router.navigate(['respuestas']);
    }
  }

  init() {
    if (this.edicion) {
      this.respuestaTestService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idRespuesta: new FormControl({ value: data.idRespuesta, disabled: true }),
          respuesta: new FormControl(data.respuesta, Validators.required),
          idPregunta: new FormControl(data.idPregunta, Validators.required),
          idUsuario: new FormControl(data.idUsuario, Validators.required)
        });
      });
    }
  }
}
