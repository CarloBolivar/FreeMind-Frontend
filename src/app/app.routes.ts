import { ReportecomentariousuarioComponent } from './components/reportes/reportecomentariousuario/reportecomentariousuario.component';
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
import { ReporteusuariorollistarComponent } from './components/reportes/reporteusuariorollistar/reporteusuariorollistar.component'
import { ReporteusuariomontolistarComponent } from './components/reportes/reporteusuariomontolistar/reporteusuariomontolistar.component'
import { ReportecantidadcitasporterapiaComponent } from './components/reportes/reportecantidadcitasporterapia/reportecantidadcitasporterapia.component'
import { BuscarusuarioComponent } from './components/usuario/buscarusuario/buscarusuario.component'
import { BuscarrolComponent } from './components/rol/buscarrol/buscarrol.component'
import { BuscarterapiaComponent } from './components/terapia/buscarterapia/buscarterapia.component'
import { BuscartestComponent } from './components/test/buscartest/buscartest.component'
import { BuscarcomentarioComponent } from './components/comentario/buscarcomentario/buscarcomentario.component'
import { BuscarcitaComponent } from './components/cita/buscarcita/buscarcita.component'
import { BuscarpagoComponent } from './components/pago/buscarpago/buscarpago.component'
import { BuscarpreguntatestComponent } from './components/preguntatest/buscarpreguntatest/buscarpreguntatest.component'
import { BuscarrespuestatestComponent } from './components/respuestatest/buscarrespuestatest/buscarrespuestatest.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { ReporterecursoterapiaComponent } from './components/reportes/reporterecursoterapia/reporterecursoterapia.component';
import { ReportemontoterapiaComponent } from './components/reportes/reportemontoterapia/reportemontoterapia.component';
import { ReportetestmesComponent } from './components/reportes/reportetestpormes/reportetestpormes.component';
import { ReportesumapagospormesComponent } from './components/reportes/reportesumapagospormes/reportesumapagospormes.component';
import { ReportecantidadhorariosdisponiblesComponent } from './components/reportes/reportecantidadhorariosdisponibles/reportecantidadhorariosdisponibles.component';
import { FiltrousuarioComponent } from './components/filtro/filtrousuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { seguridadrolGuard } from './guard/seguridadrol.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/landingpage/landingpage.component')
        .then(mod => mod.LandingpageComponent)
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [seguridadGuard] },

   { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [seguridadGuard] },

  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: 'nuevo', component: InsertareditarusuarioComponent },
      { path: 'ediciones/:id', component: InsertareditarusuarioComponent },
      { path: 'busquedas', component: BuscarusuarioComponent }
    ]
  },
  {
    path: 'roles',
    component: RolComponent,
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: 'nuevo', component: InsertareditarrolComponent },
      { path: 'ediciones/:id', component: InsertareditarrolComponent },
      { path: 'busquedas', component: BuscarrolComponent }
    ]
  },
  {
    path: 'citas',
    component: CitaComponent,
    canActivate: [seguridadGuard],
    children: [
      { path: '', component: ListarcitaComponent },
      { path: 'nuevo', component: InsertareditarcitaComponent },
      { path: 'ediciones/:id', component: InsertareditarcitaComponent },
      { path: 'busquedas', component: BuscarcitaComponent }
    ]
  },
  {
    path: 'terapias',
    component: TerapiaComponent,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: InsertareditarterapiaComponent },
      { path: 'ediciones/:id', component: InsertareditarterapiaComponent },
      { path: 'busquedas', component: BuscarterapiaComponent }
    ]
  },
  {
    path: 'tests',
    component: TestComponent,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: InsertareditartestComponent },
      { path: 'ediciones/:id', component: InsertareditartestComponent },
      { path: 'busquedas', component: BuscartestComponent }
    ]
  },
  {
    path: 'recursos',
    component: RecursoComponent,
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN', 'PACIENTE'] },
    children: [
      { path: 'nuevo', component: InsertareditarrecursoComponent },
      { path: 'ediciones/:id', component: InsertareditarrecursoComponent },
      { path: 'busquedas', component: BuscarrecursoComponent }
    ]
  },
  {
    path: 'testsrealizados',
    component: TestrealizadoComponent,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: InsertareditartestrealizadoComponent },
      { path: 'ediciones/:id', component: InsertareditartestrealizadoComponent },
      { path: 'busquedas', component: BuscartestrealizadoComponent }
    ]
  },
  {
    path: 'comentarios',
    component: ComentarioComponent,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: InsertareditarcomentarioComponent },
      { path: 'ediciones/:id', component: InsertareditarcomentarioComponent },
      { path: 'busquedas', component: BuscarcomentarioComponent }
    ]
  },
  {
    path: 'pagos',
    component: PagoComponent,
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN', 'PACIENTE'] },
    children: [
      { path: 'nuevo', component: InsertareditarpagoComponent },
      { path: 'ediciones/:id', component: InsertareditarpagoComponent },
      { path: 'busquedas', component: BuscarpagoComponent }
    ]
  },
  {
    path: 'preguntas',
    component: PreguntatestComponent,
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN', 'PSICOLOGO'] },
    children: [
      { path: 'nuevo', component: InsertareditarpreguntatestComponent },
      { path: 'ediciones/:id', component: InsertareditarpreguntatestComponent },
      { path: 'busquedas', component: BuscarpreguntatestComponent }
    ]
  },
  {
    path: 'respuestas',
    component: RespuestatestComponent,
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN', 'PACIENTE'] },
    children: [
      { path: 'nuevo', component: InsertareditarrespuestatestComponent },
      { path: 'ediciones/:id', component: InsertareditarrespuestatestComponent },
      { path: 'busquedas', component: BuscarrespuestatestComponent }
    ]
  },
  {
    path: 'horarios',
    loadComponent: () => import('./components/horario/horario.component').then(m => m.HorarioComponent),
    canActivate: [seguridadGuard, seguridadrolGuard],
    data: { roles: ['ADMIN', 'PSICOLOGO'] },
    children: [
      { path: '', loadComponent: () => import('./components/horario/listarhorario/listarhorario.component').then(m => m.ListarhorarioComponent) },
      { path: 'nuevo', loadComponent: () => import('./components/horario/insertareditar/insertareditar.component').then(m => m.InsertareditarhorarioComponent) },
      { path: 'edicion/:id', loadComponent: () => import('./components/horario/insertareditar/insertareditar.component').then(m => m.InsertareditarhorarioComponent) },
      { path: 'busquedas', loadComponent: () => import('./components/horario/buscarhorario/buscarhorario.component').then(m => m.BuscarhorarioComponent) }
    ]
  },
  {
    path: 'reports',
    component: ReportesComponent,
    canActivate: [seguridadGuard],
    children: [
      { path: 'ingresos', component: ReportetotaingresospsicologosComponent },
      { path: 'cantidad_citas', component: ReportecantidadcitasporterapiaComponent },
      { path: 'roles_usuario', component: ReporteusuariorollistarComponent },
      { path: 'montos_usuario', component: ReporteusuariomontolistarComponent },
      { path: 'comentarios_usuario', component: ReportecomentariousuarioComponent },
      { path: 'recursos_terapia', component: ReporterecursoterapiaComponent },
      { path: 'montos_terapia', component: ReportemontoterapiaComponent },
      { path: 'testrealizados_mes', component: ReportetestmesComponent },
      { path: 'sumapagos_mes', component: ReportesumapagospormesComponent },
      { path: 'horariosdisponibles_psicologo', component: ReportecantidadhorariosdisponiblesComponent }
    ]
  },
  { path: 'filtro', component: FiltrousuarioComponent, canActivate: [seguridadGuard, seguridadrolGuard], data: { roles: ['ADMIN'] } },
  { path: 'musica', component: ApimusicaComponent, canActivate: [seguridadGuard] },
  { path: 'imagenes', component: ApiimagenesComponent, canActivate: [seguridadGuard] },
  { path: 'chatbot', component: ApichatbotComponent, canActivate: [seguridadGuard] },
  { path: '**', redirectTo: 'login' }
];
