import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
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
    FormsModule,
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
  respuestasSugeridas: string[] = ['Sí', 'No', 'A veces', 'Frecuentemente', 'Nunca', 'Rara vez', 'Casi siempre', 'Depende', 'OTRO'];
  respuestaEsOtro: boolean = false;
  respuestaPersonalizada: string = '';

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
      this.respuestaTest.idPregunta = this.form.get('idPregunta')?.value;
      this.respuestaTest.idUsuario = this.form.get('idUsuario')?.value;

      this.respuestaTest.respuesta = this.respuestaEsOtro
        ? this.respuestaPersonalizada
        : this.form.get('respuesta')?.value;

      if (this.edicion) {
        this.respuestaTestService.update(this.respuestaTest).subscribe(() => {
          this.respuestaTestService.list().subscribe(data => {
            this.respuestaTestService.setList(data);
          });
        });
      } else {
        this.respuestaTestService.insert(this.respuestaTest).subscribe(() => {
          this.respuestaTestService.list().subscribe(data => {
            this.respuestaTestService.setList(data);
          });
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

        if (!this.respuestasSugeridas.includes(data.respuesta)) {
          this.respuestaEsOtro = true;
          this.respuestaPersonalizada = data.respuesta;
          this.form.get('respuesta')?.setValue('OTRO');
        }
      });
    }
  }

  onRespuestaSeleccionada(valor: string): void {
    this.respuestaEsOtro = valor === 'OTRO';
  }
}
