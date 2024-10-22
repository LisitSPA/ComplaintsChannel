import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './user/report/report.component';
import { InvolucradosComponent } from './user/involucrados/involucrados.component';
import { EvidenciaComponent } from './user/evidencia/evidencia.component';
import { TrackingCodeComponent } from './user/tracking-code/tracking-code.component';
import { SeguimientoComponent } from './user/seguimiento/seguimiento.component';
import { SuccessreportComponent } from './user/successreport/successreport.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { UsersComponent } from './admin/users/users.component';
import { DenuncianteComponent } from './user/denunciante/denunciante.component';
import { ConfigurationComponent } from './admin/configuration/configuration.component';
import { DenunciasComponent } from './admin/denuncias/denuncias.component';
import { ChatAdminComponent } from './admin/chat-admin/chat-admin.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent },
  { path: 'report', component: ReportComponent},
  { path: 'evidencia', component: EvidenciaComponent},
  { path: 'involucrados', component: InvolucradosComponent},
  { path: 'denunciante', component:DenuncianteComponent}, 
  { path: 'seguimiento', component: TrackingCodeComponent},
  { path: 'seguimiento/:code', component: SeguimientoComponent },
  {path:'successreport', component:SuccessreportComponent},
  {path:'login', component:LoginComponent},
  {path:'recuperar', component: RecuperarComponent},  
  //{path: 'chat', component: ChatUserComponent},
  {path: 'usersadmin', component: UsersComponent},  
  { path: 'denunciasadmin', component: DenunciasComponent},
  {path:'chatadmin', component: ChatAdminComponent},
  {
    path: '',
    component: LayoutComponent,
    data: {
        layout: 'empty'
    },
    children: [
      { path: 'homeadmin', component: HomeAdminComponent},   
      { path:'cambiarcontrasenaadmin', component: ChangePasswordComponent},
      { path:'configurationadmin', component: ConfigurationComponent },
    ]
  },

];
