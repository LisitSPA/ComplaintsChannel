import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { environment } from '../../../environment/environment';
import { NotifierModule } from 'gramli-angular-notifier';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, NotifierModule, MatIconModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'] 
})
export class SidebarAdmin {
  logoUrl: string = '';
  isActive: boolean = false;
  isShowing: boolean = false;
  isMobileMenuOpen: boolean = false;
  selectedSection: string = '';
  isAdmin: boolean = false;


  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) {
   
  }

  ngOnInit(): void {
    this.getConfiguration();
    this.isAdmin = sessionStorage.getItem('role') === 'Administrador';
  }

  getConfiguration(): void {
    this.configurationService.getConfiguration().subscribe(
      (data: any) => {
        if (data?.content?.color) {
          this.configurationService.setColor = data.content.color;
        }

        if (data?.content?.logo) {
          this.logoUrl = `${environment.filesUrl}Logo/${data.content.logo}`;
          this.configurationService.setLogoUrl = this.logoUrl;
        }
      },
      (error: any) => {
        console.error('Error al obtener la configuración:', error);
      },
      () => {
        this.configurationService.updateDefaultColor();
        this.isShowing = true;
      }
    );
  }

  toggleMobileMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSection(section: string) {
    this.isActive = !this.isActive;
    this.selectedSection = section; 
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
