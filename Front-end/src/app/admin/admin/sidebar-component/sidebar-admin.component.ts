import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ConfigurationService } from '../../../services/configuration.service';


@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'] 
})
export class SidebarAdmin {

  isActive: boolean = false; 
  selectedSection: string = '';

  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) {
   
  }

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(): void {
    this.configurationService.getConfiguration().subscribe(
      (data: any) => {
        console.log('data:', { data });
        if (data?.content?.color) {
          this.configurationService.setColor = data.content.color;
        }

        // TODO add logo
      },
      (error: any) => {
        console.error('Error al obtener la configuración:', error);
      },
      () => {
        this.configurationService.updateDefaultColor();
      }
    );
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
