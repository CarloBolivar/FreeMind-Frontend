import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-insertareditarpago',
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './insertareditarpago.component.html',
  styleUrl: './insertareditarpago.component.css'
})
export class InsertareditarpagoComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  pago:Pago=new Pago()

  listaCitas:Cita[]=[]

  id:number=0
  edicion:boolean=false

  constructor(private pS:PagoService, private formBuilder:FormBuilder, private router:Router, private cS:CitaService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      //actualizar
      this.init()
    })

      this.form=this.formBuilder.group({
        codigo:[''],
        nTarjeta:['',Validators.required],
        nombre:['',Validators.required],
        apellido:['',Validators.required],
        mes:['',Validators.required],
        anho:['',Validators.required],
        cvv:['',Validators.required],
        correo:['',Validators.required],
        monto:['',Validators.required],
        citaid:['',Validators.required]
      })
      this.cS.list().subscribe(data=>{
        this.listaCitas=data 
      })
  }
  aceptar(){
    if(this.form.valid){
      this.pago.idPago=this.form.value.codigo
      this.pago.numeroTarjeta=this.form.value.nTarjeta
      this.pago.nombres=this.form.value.nombre
      this.pago.apellidos=this.form.value.apellido
      this.pago.mes=this.form.value.mes
      this.pago.anio=this.form.value.anho
      this.pago.cvv=this.form.value.cvv
      this.pago.correo=this.form.value.correo
      this.pago.monto=this.form.value.monto
      this.pago.cita.idCita=this.form.value.citaid

      if(this.edicion){
        this.pS.update(this.pago).subscribe(data=>{
        this.pS.list().subscribe(data=>{
          this.pS.setList(data)
        })
      })
      }else{
        this.pS.insert(this.pago).subscribe(data=>{
        this.pS.list().subscribe(data=>{
          this.pS.setList(data)
        })
      })
      }
      
      this.router.navigate(['pagos'])
    }
  }

  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data =>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idPago),
          nTarjeta:new FormControl(data.numeroTarjeta),
          nombre:new FormControl(data.nombres),
          apellido:new FormControl(data.apellidos),
          mes: new FormControl(data.mes),
          anho: new FormControl(data.anio),
          cvv: new FormControl(data.cvv),
          correo: new FormControl(data.correo),
          monto:new FormControl(data.monto),
          citaid:new FormControl(data.cita.idCita)
        })
      })
    }
  }
}
