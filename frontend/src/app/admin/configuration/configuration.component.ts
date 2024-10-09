import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule,FormsModule,SidebarAdmin],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  companyName: string = '';
  channelStatus: string = 'Activo';
  customColor: string = '#2324f5';
  showNavBar: boolean = true;

  predefinedColors: string[] = ['#6a5acd', '#32cd32', '#ff69b4', '#ffcc00', '#00ff7f'];
  statuses: string[] = ['Activo', 'Inactivo'];

  setColor(color: string): void {
    this.customColor = color;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  }

  guardarConfiguracion(): void {
    // Lógica para guardar la configuración
    console.log('Configuración guardada:', {
      companyName: this.companyName,
      channelStatus: this.channelStatus,
      customColor: this.customColor,
      showNavBar: this.showNavBar
    });
  }

}
