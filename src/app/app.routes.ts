import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditar/insertareditar.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditar/insertareditar.component';
import { TerapiaComponent } from './components/terapia/terapia.component';
import { InsertareditarterapiaComponent } from './components/terapia/insertareditar/insertareditar.component';
import { TestComponent } from './components/test/test.component';
import { InsertareditartestComponent } from './components/test/insertareditar/insertareditar.component';
import { RecursoComponent } from './components/recurso/recurso.component';
import { InsertareditarrecursoComponent } from './components/recurso/insertareditarrecurso/insertareditarrecurso.component';
import { TestrealizadoComponent } from './components/testrealizado/testrealizado.component';
import { InsertareditartestrealizadoComponent } from './components/testrealizado/insertareditartestrealizado/insertareditartestrealizado.component';

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
    path: 'recursos',
    component: RecursoComponent,
    children: [
      { path: 'nuevo', component: InsertareditarrecursoComponent },
      { path: 'ediciones/:id', component: InsertareditarrecursoComponent }
    ]
  }
  ,
  {
    path: 'testsrealizados',
    component: TestrealizadoComponent,
    children: [
      { path: 'nuevo', component: InsertareditartestrealizadoComponent },
      { path: 'ediciones/:id', component: InsertareditartestrealizadoComponent }
    ]
  }
];
