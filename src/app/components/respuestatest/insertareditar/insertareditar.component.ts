import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RespuestaTest } from '../../../models/respuestatest';
import { RespuestaTestService } from '../../../services/respuestatest.service';
import { PreguntaTestService } from '../../../services/preguntatest.service';
import { UsuarioService } from '../../../services/usuario.service';
import { PreguntaTest } from '../../../models/preguntatest';
import { Usuario } from '../../../models/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarrespuestatest',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarrespuestatestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  respuestaTest: RespuestaTest = new RespuestaTest();
  id: number = 0;
  edicion: boolean = false;

  preguntas: PreguntaTest[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private respuestaTestService: RespuestaTestService,
    private preguntaTestService: PreguntaTestService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.preguntaTestService.list().subscribe(data => this.preguntas = data);
    this.usuarioService.list().subscribe(data => this.usuarios = data);

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = !!this.id;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      respuesta: ['', Validators.required],
      idPregunta: ['', Validators.required],
      idUsuario: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.respuestaTest.idRespuesta = this.form.value.codigo;
      this.respuestaTest.respuesta = this.form.value.respuesta;
      this.respuestaTest.preguntaTest.idPregunta = this.form.value.idPregunta;
      this.respuestaTest.usuario.idUsuario = this.form.value.idUsuario;

      const operacion = this.edicion
        ? this.respuestaTestService.update(this.respuestaTest)
        : this.respuestaTestService.insert(this.respuestaTest);

      operacion.subscribe(() => {
        this.respuestaTestService.list().subscribe(data => {
          this.respuestaTestService.setList(data);
        });
        this.router.navigate(['respuestatest']);
      });
    }
  }

  init(): void {
    if (this.edicion) {
      this.respuestaTestService.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idRespuesta),
          respuesta: new FormControl(data.respuesta, Validators.required),
          idPregunta: new FormControl(data.preguntaTest.idPregunta, Validators.required),
          idUsuario: new FormControl(data.usuario.idUsuario, Validators.required)
        });
      });
    }
  }
}
