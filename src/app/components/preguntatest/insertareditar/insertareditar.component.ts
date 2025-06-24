import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PreguntaTest } from '../../../models/preguntatest';
import { PreguntaTestService } from '../../../services/preguntatest.service';
import { TestService } from '../../../services/test.service';
import { Test } from '../../../models/test';

@Component({
  selector: 'app-insertareditarpreguntatest',
  templateUrl: './insertareditar.component.html',
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditarpreguntatestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  preguntaTest: PreguntaTest = new PreguntaTest();
  listaTests: Test[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private preguntaTestService: PreguntaTestService,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: new FormControl({ value: '', disabled: true }),
      pregunta: ['', Validators.required],
      test: ['', Validators.required]
    });

    this.testService.list().subscribe(data => {
      this.listaTests = data;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = !!this.id;
      if (this.edicion) {
        this.init();
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.preguntaTest.pregunta = formData.pregunta;
      this.preguntaTest.test = new Test();
      this.preguntaTest.test.idTest = formData.test;

      if (this.edicion) {
        this.preguntaTest.idPregunta = formData.codigo;
        this.preguntaTestService.update(this.preguntaTest).subscribe(() => {
          this.router.navigate(['preguntastest']);
        });
      } else {
        this.preguntaTestService.insert(this.preguntaTest).subscribe(() => {
          this.router.navigate(['preguntastest']);
        });
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.preguntaTestService.listId(this.id).subscribe(data => {
        this.form.setValue({
          codigo: data.idPregunta,
          pregunta: data.pregunta,
          test: data.test.idTest
        });
      });
    }
  }
}
