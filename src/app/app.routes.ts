import { Routes } from '@angular/router'
import { UsuarioComponent } from './components/usuario/usuario.component'
import { InsertareditarusuarioComponent } from './components/usuario/insertareditar/insertareditar.component'
import { RolComponent } from './components/rol/rol.component'
import { InsertareditarrolComponent } from './components/rol/insertareditar/insertareditar.component'
import { TerapiaComponent } from './components/terapia/terapia.component'
import { InsertareditarterapiaComponent } from './components/terapia/insertareditar/insertareditar.component'
import { TestComponent } from './components/test/test.component'
import { InsertareditartestComponent } from './components/test/insertareditar/insertareditar.component'
import { RecursoComponent } from './components/recurso/recurso.component'
import { InsertareditarrecursoComponent } from './components/recurso/insertareditarrecurso/insertareditarrecurso.component'
import { TestrealizadoComponent } from './components/testrealizado/testrealizado.component'
import { InsertareditartestrealizadoComponent } from './components/testrealizado/insertareditartestrealizado/insertareditartestrealizado.component'
import { ComentarioComponent } from './components/comentario/comentario.component'
import { InsertareditarcomentarioComponent } from './components/comentario/insertareditarcomentario/insertareditarcomentario.component'
import { CitaComponent } from './components/cita/cita.component'
import { ListarcitaComponent } from './components/cita/listarcita/listarcita.component'
import { InsertareditarcitaComponent } from './components/cita/insertareditar/insertareditar.component'
import { PagoComponent } from './components/pago/pago.component'
import { InsertareditarpagoComponent } from './components/pago/insertareditarpago/insertareditarpago.component'
import { PreguntatestComponent } from './components/preguntatest/preguntatest.component'
import { InsertareditarpreguntatestComponent } from './components/preguntatest/insertareditar/insertareditar.component'
import { RespuestatestComponent } from './components/respuestatest/respuestatest.component'
import { InsertareditarrespuestatestComponent } from './components/respuestatest/insertareditar/insertareditar.component'
import { ApimusicaComponent } from './components/api/apimusica/apimusica.component'
import { ApiimagenesComponent } from './components/api/apiimagenes/apiimagenes.component'
import { ApichatbotComponent } from './components/api/apichatbot/apichatbot.component'
import { BuscarrecursoComponent } from './components/recurso/buscarrecurso/buscarrecurso.component'
import { BuscartestrealizadoComponent } from './components/testrealizado/buscartestrealizado/buscartestrealizado.component'
import { ReportesComponent } from './components/reportes/reportes.component'
import { ReportetotaingresospsicologosComponent } from './components/reportes/reportetotaingresospsicologos/reportetotaingresospsicologos.component'
import { UsuariorollistarComponent } from './components/usuario/usuariorollistar/usuariorollistar.component'
import { UsuariomontolistarComponent } from './components/usuario/usuariomontolistar/usuariomontolistar.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/landingpage/landingpage.component')
        .then(mod => mod.LandingpageComponent)
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: InsertareditarusuarioComponent },
      { path: 'ediciones/:id', component: InsertareditarusuarioComponent },
      { path: 'roles_usuario', component: UsuariorollistarComponent },
      { path: 'montos_usuario', component:UsuariomontolistarComponent}
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
      { path: 'ediciones/:id', component: InsertareditarrecursoComponent },
      { path:'busquedas',component:BuscarrecursoComponent }
    ]
  },
  {
    path: 'testsrealizados',
    component: TestrealizadoComponent,
    children: [
      { path: 'nuevo', component: InsertareditartestrealizadoComponent },
      { path: 'ediciones/:id', component: InsertareditartestrealizadoComponent },
      { path:'busquedas',component:BuscartestrealizadoComponent }
    ]
  },
  {
    path: 'comentarios',
    component: ComentarioComponent,
    children: [
      { path: 'nuevo', component: InsertareditarcomentarioComponent },
      { path: 'ediciones/:id', component: InsertareditarcomentarioComponent }
    ]
  },
  {
    path: 'pagos',
    component: PagoComponent,
    children: [
      { path: 'nuevo', component: InsertareditarpagoComponent },
      { path: 'ediciones/:id', component: InsertareditarpagoComponent }
    ]
  },
  {
    path: 'preguntas',
    component: PreguntatestComponent,
    children: [
      { path: 'nuevo', component: InsertareditarpreguntatestComponent },
      { path: 'ediciones/:id', component: InsertareditarpreguntatestComponent }
    ]
  },
  {
    path: 'respuestas',
    component: RespuestatestComponent,
    children: [
      { path: 'nuevo', component: InsertareditarrespuestatestComponent },
      { path: 'ediciones/:id', component: InsertareditarrespuestatestComponent }
    ]
  },
  {
    path: 'horarios',
    loadComponent: () =>
      import('./components/horario/horario.component')
        .then(m => m.HorarioComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/horario/listarhorario/listarhorario.component')
            .then(m => m.ListarhorarioComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./components/horario/insertareditar/insertareditar.component')
            .then(m => m.InsertareditarhorarioComponent)
      },
      {
        path: 'edicion/:id',
        loadComponent: () =>
          import('./components/horario/insertareditar/insertareditar.component')
            .then(m => m.InsertareditarhorarioComponent)
      }
    ]
  },
        {
        path:'reports',component:ReportesComponent,
        children:[
            {
                path:'ingresos', component:ReportetotaingresospsicologosComponent
            },
        ]
    },
  {
  path: 'musica',
  component: ApimusicaComponent
  },
  {
  path: 'imagenes',
  component: ApiimagenesComponent
  },
  {
  path: 'chatbot',
  component: ApichatbotComponent
  }
]
