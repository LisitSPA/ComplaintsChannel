import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurationService } from '../../services/configuration.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})
export class ConfigurationComponent {
  companyName: string = '';
  channelStatus: string = 'Activo';
  customColor: string = '#2324f5';
  logoFile: File | null = null;
  showNavBar: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  predefinedColors: string[] = [
    '#4C3DB2',
    '#32cd32',
    '#ff69b4',
    '#ffcc00',
    '#00ff7f',
  ];
  statuses: string[] = ['Activo', 'Inactivo'];

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(): void {
    this.customColor = this.configurationService.getColor;
  }

  setColor(color: string): void {
    this.customColor = color;
    this.configurationService.updateDefaultColor(color);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.logoFile = file;
  }

  guardarConfiguracion(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const data = {
      logo: this.logoFile,
      color: this.customColor,
    };

    this.configurationService.updateConfiguration(data).subscribe(
      (response) => {
        if (this.customColor)
          this.configurationService.setColor = response.content.color;

        if (this.logoFile) {
          this.configurationService.setLogoUrl = `${environment.filesUrl}Logo/${this.logoFile.name}`;
          window.location.reload();
        }

        this.successMessage = 'Configuración actualizada con éxito';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error al actualizar la configuración';
        this.successMessage = '';
        console.error('Error al actualizar la configuración:', error);
      }
    );
    console.log('Configuración guardada:', {
      companyName: this.companyName,
      channelStatus: this.channelStatus,
      customColor: this.customColor,
      showNavBar: this.showNavBar,
    });
  }
}
