  import { Component } from '@angular/core';
  import { Router, RouterOutlet,NavigationEnd  } from '@angular/router'; 
  import { FaqComponent } from './user/faq/faq.component';
  import { FooterComponent } from './user/footer/footer.component';
  import { HeaderComponent } from './user/header/header.component';
  import { HomeComponent } from './user/home/home.component';
  import { HowItWorksComponent } from './user/how-it-works/how-it-works.component';
  import { InformationComponent } from './user/information/information.component';
  import { LoginComponent } from './login/login.component';
  import { CommonModule } from '@angular/common';
  import { ReportComponent } from './user/report/report.component';
  import { InvolucradosComponent } from './user/involucrados/involucrados.component';
  import { EvidenciaComponent } from './user/evidencia/evidencia.component';
  import { DenuncianteComponent } from './user/denunciante/denunciante.component';
  import { MisdatosComponent } from './user/misdatos/misdatos.component';
  import { FormsModule } from '@angular/forms'; 
  import { HomeAdminComponent } from './admin/admin/home-admin/home-admin.component';
  import { ChartComponent } from 'chart.js';
  import { QuickAccessAdmin } from './admin/admin/quick-access-component/quick-access-component.component';
  import { RecentComplaintsTableAdmin } from './admin/admin/recent-complaints-table-component/recent-complaints-table-component.component';
  import { SidebarAdmin } from './admin/admin/sidebar-component/sidebar-admin.component';
  import { ReactiveFormsModule } from '@angular/forms';
  import { TrackingCodeComponent } from './user/tracking-code/tracking-code.component';
  import { SeguimientoComponent } from './user/seguimiento/seguimiento.component';
  import { HeaderAdmin } from './admin/admin/header-component/header-admin.component';
  import { BaseChartDirective } from 'ng2-charts';
  import { ChatComponent } from './user/chat/chat.component';
  import { ChartsAdmin } from './admin/admin/charts-component/charts-component.component';
  import { DenunciasComponent } from './admin/denuncias/denuncias.component';
  import { ConfigurationComponent } from './admin/configuration/configuration.component';
  import { UsersComponent } from './admin/users/users.component';
  import { ChatAdminComponent } from './admin/chat-admin/chat-admin.component';
  import { NewUserComponent } from './admin/new-user/new-user.component';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [NewUserComponent, ChatAdminComponent, ConfigurationComponent,  DenunciasComponent, RouterOutlet,FaqComponent, FooterComponent,HeaderComponent,HomeComponent, HowItWorksComponent, InformationComponent, LoginComponent, CommonModule,ReportComponent,InvolucradosComponent,
      EvidenciaComponent, DenuncianteComponent, MisdatosComponent, FormsModule, HomeAdminComponent, ChartsAdmin, QuickAccessAdmin, RecentComplaintsTableAdmin, SidebarAdmin,
      ReactiveFormsModule, TrackingCodeComponent, SeguimientoComponent, HeaderAdmin, BaseChartDirective, ChatComponent, UsersComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
  })

  export class AppComponent {
    title = 'test';
    isExpanded = false;
    showAdminHeader: boolean = false;
    showAdminSidebar: boolean = false;
    showHeaderFooter: boolean = true;


    constructor(private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.showHeaderFooter = !event.url.includes('admin');
          this.showAdminHeader = event.url.includes('admin');
          this.showAdminSidebar = event.url.includes('admin');
        }
      });
    }

    
        mostrarFormulario = false; 

        abrirFormulario() {
          this.mostrarFormulario = true;
        }

        cerrarFormulario() {
          this.mostrarFormulario = false;
        }

    
    
  }