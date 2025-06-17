import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditar/insertareditar.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditar/insertareditar.component';

import { CitaComponent } from './components/cita/cita.component';
import { ListarcitaComponent } from './components/cita/listarcita/listarcita.component';
import { InsertareditarcitaComponent } from './components/cita/insertareditar/insertareditar.component';

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
    path: 'citas',
    component: CitaComponent,
    children: [
      { path: '', component: ListarcitaComponent },
      { path: 'nuevo', component: InsertareditarcitaComponent },
      { path: 'ediciones/:id', component: InsertareditarcitaComponent }
    ]
  }
];
