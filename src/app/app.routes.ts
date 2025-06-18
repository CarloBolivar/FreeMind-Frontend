import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditar/insertareditar.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditar/insertareditar.component';
import { TerapiaComponent } from './components/terapia/terapia.component';
import { InsertareditarterapiaComponent } from './components/terapia/insertareditar/insertareditar.component';
import { TestComponent } from './components/test/test.component';
import { InsertareditartestComponent } from './components/test/insertareditar/insertareditar.component';
import { <<<<<<< HEAD
import { ComentarioComponent } from './components/comentario/comentario.component';
import { TestrealizadoComponent } from './components/testrealizado/testrealizado.component';
=======
import { ComentarioComponent } from './components/comentario/comentario.component';
import { TestrealizadoComponent } from './components/testrealizado/testrealizado.component';
>>>>>>> 6b145eb (Listar comentarios y listar test realizados)

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: InsertareditarusuarioComponent },
      { path: 'ediciones/:id', component: InsertareditarusuarioComponent }
    ]
  },
  {
    path: 'roles',
    component: RolComponent,
    children: [
      { path: 'nuevo', component: InsertareditarrolComponent },
      { path: 'ediciones/:id', component: InsertareditarrolComponent }
    ]
  },
  {
    path: 'terapias',
    component: TerapiaComponent,
    children: [
      { path: 'nuevo', component: InsertareditarterapiaComponent },
      { path: 'ediciones/:id', component: InsertareditarterapiaComponent }
    ]
  },
  {
    path: 'tests',
    component: TestComponent,
    children: [
      { path: 'nuevo', component: InsertareditartestComponent },
      { path: 'ediciones/:id', component: InsertareditartestComponent }
    ]
  },
  {
    path: 'comentarios',
    component:ComentarioComponent
  },
  {
    path: 'testrealizados',
    component:TestrealizadoComponent
  },
]
