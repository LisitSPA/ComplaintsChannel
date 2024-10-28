import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-usuario',
  standalone: true,
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent {
  @Input() usuarioId!: number;  
  @Output() cerrar = new EventEmitter<void>();  
  @Output() usuarioEliminado = new EventEmitter<void>();  
  submit = false;

  constructor(private userService: UserService, private router: Router) {}

  confirmarEliminacion() {
    this.submit = true;
    this.userService.deleteUser(this.usuarioId).subscribe(
      response => {
        console.log('Usuario eliminado con éxito:', response);
        this.usuarioEliminado.emit();  
        this.cerrar.emit();  
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
        this.cerrar.emit();  
      }
    );
  }

  cancelarEliminacion() {
    this.cerrar.emit();  
  }
}
