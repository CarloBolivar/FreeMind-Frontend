import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-insertareditarcomentario',
  imports: [MatInputModule, CommonModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule
    ,MatSelectModule],
    
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertareditarcomentario.component.html',
  styleUrl: './insertareditarcomentario.component.css'
})
export class InsertareditarcomentarioComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  comentario:Comentario=new Comentario
  id:number=0
  edicion:boolean=false

  listaUsuarios:Usuario[]=[]

  constructor(private formBuilder:FormBuilder, private cS:ComentarioService, private router:Router, private uS:UsuarioService,
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
        comentario:['', Validators.required],
        puntuacion:['', Validators.required],
        fecha:['', Validators.required],
        user:['', Validators.required]
      })

      this.uS.list().subscribe(data=>{
        this.listaUsuarios=data
      })
  }

  aceptar(){
    if(this.form.valid){
      this.comentario.idComentario=this.form.value.codigo
      this.comentario.comentario=this.form.value.comentario
      this.comentario.puntuacion=this.form.value.puntuacion
      this.comentario.fecha=this.form.value.fecha
      this.comentario.usuario.idUsuario=this.form.value.user
      
      if(this.edicion){
        this.cS.update(this.comentario).subscribe(data=>{
          this.cS.list().subscribe(data=>{
            this.cS.setList(data)
          })
        })
      }else{
        this.cS.insert(this.comentario).subscribe(()=>{
        this.cS.list().subscribe(data=>{ 
          this.cS.setList(data)
        })
      })
      }
      this.router.navigate(['comentarios'])
    }    
  }

  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idComentario),
          comentario:new FormControl(data.comentario),
          puntuacion:new FormControl(data.puntuacion),
          fecha:new FormControl(data.fecha),
          user:new FormControl(data.usuario.nombre)

        })
      })

    }
  }
}
