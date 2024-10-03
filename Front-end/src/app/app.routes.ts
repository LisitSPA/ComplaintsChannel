import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './user/report/report.component';
import { InvolucradosComponent } from './user/involucrados/involucrados.component';
import { EvidenciaComponent } from './user/evidencia/evidencia.component';
import { DenuncianteComponent } from './user/denunciante/denunciante.component';
// import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { TrackingCodeComponent } from './user/tracking-code/tracking-code.component';
import { SeguimientoComponent } from './user/seguimiento/seguimiento.component';
// import { UsersComponent } from './users/users.component';
import { ChatComponent } from './user/chat/chat.component';
// import { ConfigurationComponent } from './configuration/configuration.component';
// import { DenunciasComponent } from './denuncias/denuncias.component';
import { SuccessreportComponent } from './user/successreport/successreport.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent },
  { path: 'report', component: ReportComponent},
  { path: 'evidencia', component: EvidenciaComponent},
  { path: 'involucrados', component: InvolucradosComponent},
  { path: 'denunciante', component:DenuncianteComponent},
  // { path: 'homeadmin', component: HomeAdminComponent},
  { path: 'seguimiento', component: TrackingCodeComponent},
  { path: 'estado', component: SeguimientoComponent },
  // {path: 'usersadmin', component: UsersComponent},
  {path: 'chat', component: ChatComponent},
  // {path:'configurationadmin', component: ConfigurationComponent},
  // { path: 'denunciasadmin', component: DenunciasComponent},
  {path:'successreport', component:SuccessreportComponent},
  {path:'login', component:LoginComponent},

];
