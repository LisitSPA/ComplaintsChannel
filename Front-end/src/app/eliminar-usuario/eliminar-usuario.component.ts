import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';


@Component({
  selector: 'app-eliminar-usuario',
  standalone: true,
  templateUrl: './eliminar-usuario.component.html',
  imports: [NotifierModule],
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent {
  @Input() usuarioId!: number;  
  @Output() cerrar = new EventEmitter<void>();  
  @Output() usuarioEliminado = new EventEmitter<void>();  
  submit = false;

  constructor(private userService: UserService, private notifier: NotifierService) {}

  confirmarEliminacion() {
    this.submit = true;
    this.userService.deleteUser(this.usuarioId).subscribe(
      response => {
        this.notifier.notify('success', 'Usuario eliminado con éxito');
        this.usuarioEliminado.emit();  
        this.cerrar.emit();  
      },
      error => {
        this.notifier.notify('error', 'Error al eliminar el usuario');
        console.error('Error al eliminar el usuario:', error);
        this.submit = false;  
      }
    );
  }

  cancelarEliminacion() {
    this.cerrar.emit();  
  }
}
