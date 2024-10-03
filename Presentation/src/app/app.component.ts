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
  // import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
  // import { ChartsAdmin } from './admin/charts-component/charts-component.component';
  // import { QuickAccessAdmin } from './admin/quick-access-component/quick-access-component.component';
  // import { RecentComplaintsTableAdmin } from './admin/recent-complaints-table-component/recent-complaints-table-component.component';
  // import { SidebarAdmin } from './admin/sidebar-component/sidebar-admin.component';
  // import { ReactiveFormsModule } from '@angular/forms';
  import { TrackingCodeComponent } from './user/tracking-code/tracking-code.component';
  import { SeguimientoComponent } from './user/seguimiento/seguimiento.component';
  // import { HeaderAdmin } from './admin/header-component/header-admin.component';
  import { BaseChartDirective } from 'ng2-charts';
  import { ChatComponent } from './user/chat/chat.component';
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [ ChatComponent, BaseChartDirective, SeguimientoComponent, TrackingCodeComponent, RouterOutlet, FaqComponent, FooterComponent, HeaderComponent, HomeComponent, HowItWorksComponent,InformationComponent,
      LoginComponent, FormsModule,CommonModule, MisdatosComponent, ReportComponent, InvolucradosComponent,EvidenciaComponent,DenuncianteComponent,
      // HomeAdminComponent, ChartsAdmin, QuickAccessAdmin, RecentComplaintsTableAdmin,HeaderAdmin,SidebarAdmin,ReactiveFormsModule,
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
