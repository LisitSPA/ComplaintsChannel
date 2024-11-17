import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurationService } from '../../services/configuration.service';
import { environment } from '../../../environment/environment';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule, NotifierModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})
export class ConfigurationComponent {
  companyName: string = '';
  channelStatus: string = 'Activo';
  customColor: string = '#2324f5';
  logoFile: File | null = null;
  showNavBar: boolean = true;

  predefinedColors: string[] = [
    '#4C3DB2',
    '#32cd32',
    '#ff69b4',
    '#ffcc00',
    '#00ff7f',
  ];
  statuses: string[] = ['Activo', 'Inactivo'];

  constructor(private configurationService: ConfigurationService, private notifier: NotifierService) {}

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

        this.notifier.notify('success', 'Configuración actualizada con éxito');
      },
      (error) => {
        this.notifier.notify('error', 'Error al actualizar la configuración');
        console.error('Error al actualizar la configuración:', error);
      }
    );
  }
}
