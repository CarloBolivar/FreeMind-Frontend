import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'

import { Pago } from '../../../models/pago'
import { Cita } from '../../../models/cita'
import { PagoService } from '../../../services/pago.service'
import { CitaService } from '../../../services/cita.service'

@Component({
  selector: 'app-insertareditarpago',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './insertareditarpago.component.html',
  styleUrls: ['./insertareditarpago.component.css']
})
export class InsertareditarpagoComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  pago: Pago = new Pago()

  listaCitas: Cita[] = []

  id: number = 0
  edicion: boolean = false

  constructor(
    private pagoService: PagoService,
    private citaService: CitaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = this.id != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      nTarjeta: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mes: ['', Validators.required],
      anho: ['', Validators.required],
      cvv: ['', Validators.required],
      correo: ['', Validators.required],
      monto: ['', Validators.required],
      citaid: ['', Validators.required]
    })

    this.citaService.list().subscribe(data => {
      this.listaCitas = data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.pago.idPago = this.form.value.codigo
      this.pago.numeroTarjeta = this.form.value.nTarjeta
      this.pago.nombres = this.form.value.nombre
      this.pago.apellidos = this.form.value.apellido
      this.pago.mes = this.form.value.mes
      this.pago.anio = this.form.value.anho
      this.pago.cvv = this.form.value.cvv
      this.pago.correo = this.form.value.correo
      this.pago.monto = this.form.value.monto
      this.pago.cita.idCita = this.form.value.citaid

      if (this.edicion) {
        this.pagoService.update(this.pago).subscribe(() => {
          this.pagoService.list().subscribe(data => {
            this.pagoService.setList(data)
          })
        })
      } else {
        this.pagoService.insert(this.pago).subscribe(() => {
          this.pagoService.list().subscribe(data => {
            this.pagoService.setList(data)
          })
        })
      }

      this.router.navigate(['pagos'])
    }
  }

  init() {
    if (this.edicion) {
      this.pagoService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPago),
          nTarjeta: new FormControl(data.numeroTarjeta),
          nombre: new FormControl(data.nombres),
          apellido: new FormControl(data.apellidos),
          mes: new FormControl(data.mes),
          anho: new FormControl(data.anio),
          cvv: new FormControl(data.cvv),
          correo: new FormControl(data.correo),
          monto: new FormControl(data.monto),
          citaid: new FormControl(data.cita.idCita)
        })
      })
    }
  }
}
