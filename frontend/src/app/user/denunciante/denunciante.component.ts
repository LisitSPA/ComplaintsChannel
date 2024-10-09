import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { MisdatosComponent } from '../misdatos/misdatos.component';

@Component({
  selector: 'app-denunciante',
  standalone: true,
  imports: [CommonModule, FormsModule, MisdatosComponent],
  templateUrl: './denunciante.component.html',
  styleUrl: './denunciante.component.css'
})
export class DenuncianteComponent {
  mostrarFormulario: boolean = false;

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
}
