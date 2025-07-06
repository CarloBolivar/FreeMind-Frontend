import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PreguntaTest } from '../../../models/preguntatest';
import { Test } from '../../../models/test';
import { PreguntaTestService } from '../../../services/preguntatest.service';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarpreguntatest',
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
export class InsertareditarpreguntatestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  preguntaTest: PreguntaTest = { idPregunta: 0, pregunta: '', idTest: 0 };

  id: number = 0;
  edicion: boolean = false;
  listaTests: Test[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private preguntaTestService: PreguntaTestService,
    private testService: TestService,
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
      idPregunta: [{ value: '', disabled: true }],
      pregunta: ['', Validators.required],
      idTest: ['', Validators.required]
    });

    this.testService.list().subscribe(data => {
      this.listaTests = data;
    });
  }

  aceptar() {
  if (this.form.valid) {
    this.preguntaTest.idPregunta = this.form.get('idPregunta')?.value;
    this.preguntaTest.pregunta = this.form.get('pregunta')?.value;
    this.preguntaTest.idTest = this.form.get('idTest')?.value;

    if (this.edicion) {
      this.preguntaTestService.update(this.preguntaTest).subscribe(() => {
        this.preguntaTestService.list().subscribe(data => {
          this.preguntaTestService.setList(data);
        });
      });
    } else {
      this.preguntaTestService.insert(this.preguntaTest).subscribe(() => {
        this.preguntaTestService.list().subscribe(data => {
          this.preguntaTestService.setList(data); 
        });
      });
    }

    this.router.navigate(['preguntas']);
  }
}


  init() {
    if (this.edicion) {
      this.preguntaTestService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idPregunta: new FormControl({ value: data.idPregunta, disabled: true }),
          pregunta: new FormControl(data.pregunta, Validators.required),
          idTest: new FormControl(data.idTest, Validators.required)
        });
      });
    }
  }
}
