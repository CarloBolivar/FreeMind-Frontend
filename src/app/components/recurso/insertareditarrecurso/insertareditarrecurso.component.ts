import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recurso } from '../../../models/recurso';
import { RecursoService } from '../../../services/recurso.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { Terapia } from '../../../models/terapia';
import { TerapiaService } from '../../../services/terapia.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarrecurso',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatGridListModule
  ],
  templateUrl: './insertareditarrecurso.component.html',
  styleUrl: './insertareditarrecurso.component.css'
})
export class InsertareditarrecursoComponent {
form: FormGroup=new FormGroup({})
recurso:Recurso=new Recurso()

id:number=0
edicion:boolean=false
listaTerapias:Terapia[]=[]

tipos:{value:string;viewValue:string}[]=[
  {value:'Imagen',viewValue:'Imagen'},
  {value:'Audio',viewValue:'Audio'},
  {value:'Video',viewValue:'Video'}
]

  constructor(
    private formBuilder:FormBuilder,
    private rS:RecursoService,
    private router:Router,
    private tS:TerapiaService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    
      this.form=this.formBuilder.group({
        codigo:[{ value: '', disabled: true }],
        tipo:['',Validators.required],
        url:['',Validators.required],
        terapia:['',Validators.required],
      
      })
      this.tS.listar().subscribe(data=>{
        this.listaTerapias=data
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

    this.recurso.idRecurso = this.edicion ? formData.codigo : 0;
    this.recurso.tipo=this.form.value.tipo
    this.recurso.url=this.form.value.url
    this.recurso.terapia.idTerapia=this.form.value.terapia
    if (this.edicion) {

      this.rS.update(this.recurso).subscribe(() => {
        this.rS.list().subscribe(data => {
          this.rS.setList(data);
        })
        
      })
    } else {
      this.rS.insert(this.recurso).subscribe(() => {
        this.rS.list().subscribe(data => {
          this.rS.setList(data);
        })
        
      })
    }this.router.navigate(['recursos'])
    
  }
  }

   init(){
    if(this.edicion){

      this.rS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl({ value: data.idRecurso, disabled: true }),
          tipo:new FormControl(data.tipo),
          url:new FormControl(data.url),
          terapia: new FormControl(data.terapia.idTerapia),
        })
      })
    }
    
  }
  
}
