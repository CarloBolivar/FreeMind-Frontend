import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestRealizado } from '../../../models/testrealizado';
import { Usuario } from '../../../models/usuario';
import { Test } from '../../../models/test';
import { TestrealizadoService } from '../../../services/testrealizado.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-insertareditartestrealizado',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './insertareditartestrealizado.component.html',
  styleUrl: './insertareditartestrealizado.component.css'
})
export class InsertareditartestrealizadoComponent {
form: FormGroup=new FormGroup({})
testrealizado:TestRealizado=new TestRealizado()
id:number=0
edicion:boolean=false
listaUsuarios:Usuario[]=[]
listaTests:Test[]=[]

  constructor(
    private trS:TestrealizadoService,
    private formBuilder:FormBuilder,
    private router:Router,
    private uS:UsuarioService,
    private tS:TestService,
    private route:ActivatedRoute
  ) {}

ngOnInit(): void {
      this.form=this.formBuilder.group({
        codigo:[{ value: '', disabled: true }],
        fecha:['',Validators.required],
        resultado:['',Validators.required],
        usuario:['',Validators.required],
        test:['',Validators.required],
      })

      this.uS.list().subscribe(data=>{
        this.listaUsuarios=data
      })
      this.tS.list().subscribe(data=>{
        this.listaTests=data
      })

      this.route.params.subscribe((data:Params)=>{
        this.id=data['id']
        this.edicion=data['id']!=null
        if (this.edicion) {
        this.init();
      }
      })
    
 } 
 aceptar(){
  if(this.form.valid){
    const formData = this.form.getRawValue();
    this.testrealizado.idTestRealizado = this.edicion ? formData.codigo : 0;

    this.testrealizado.fecha=this.form.value.fecha
    this.testrealizado.resultado=this.form.value.resultado
    this.testrealizado.usuario.idUsuario=this.form.value.usuario
    this.testrealizado.test.idTest=this.form.value.test
    if (this.edicion) {
      this.trS.update(this.testrealizado).subscribe(() => {
        this.trS.list().subscribe(data => {
          this.trS.setList(data);
        })
        
      })

    }else {
      this.trS.insert(this.testrealizado).subscribe(data=>{
      this.trS.list().subscribe(data=>{
        this.trS.setList(data)
      })
      })
    }this.router.navigate(['testrealizados'])
    
  }
  }

  init(){
    if(this.edicion){

      this.trS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl({ value: data.idTestRealizado, disabled: true }),
          fecha: new FormControl(new Date(data.fecha)),
          resultado:new FormControl(data.resultado),
          usuario: new FormControl(data.usuario.idUsuario),
          test: new FormControl(data.test.idTest)
        })
      })
    }
    
  }
}
