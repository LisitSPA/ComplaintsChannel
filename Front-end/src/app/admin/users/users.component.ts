import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../header-component/header-admin.component';
import { NewUserComponent } from '../new-user/new-user.component';
import { EditarUsuarioComponent } from '../../editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../../eliminar-usuario/eliminar-usuario.component';
import { FormsModule } from '@angular/forms';  
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarAdmin, 
    HeaderAdmin, 
    NewUserComponent, 
    EditarUsuarioComponent, 
    EliminarUsuarioComponent, 
    FormsModule, MatButtonModule
  ], 
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usuarios: any[] = [];
  paginatedColaboradores: any[] = [];
  currentPage = 1;
  itemsPerPage = 7;
  mostrarFormulario: boolean = false;
  mostrarEditar: boolean = false; 
  mostrarEliminar: boolean = false;
  usuarioSeleccionado: any | null = null; 

  constructor(private userService: UserService) {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    let params = new HttpParams()
    this.userService.getUsers(params).subscribe((data: any) => {
      this.usuarios = data.content.data; 
      this.updatePaginatedColaboradores();
    });
  }

  get totalPages() {
    return Math.ceil(this.usuarios.length / this.itemsPerPage);
  }

  updatePaginatedColaboradores() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColaboradores = this.usuarios.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedColaboradores();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedColaboradores();
    }
  }

  pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedColaboradores();
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.mostrarEditar = false;
    this.mostrarEliminar = false;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.mostrarEditar = false;
    this.mostrarEliminar = false;
  }

  editarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.mostrarEditar = true;
    this.mostrarFormulario = false;
    this.mostrarEliminar = false;
  }

  eliminarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    // if (this.usuarioSeleccionado) {  
      this.mostrarEliminar = true; 
      this.mostrarFormulario = false;
      this.mostrarEditar = false;
    // } else {
    //   alert("Por favor selecciona un usuario antes de eliminar");
    // }
  }

  cerrarEliminar() {
    this.mostrarEliminar = false;
  }

  confirmarEliminarUsuario() {
   
      // this.usuarios = this.usuarios.filter(usuario => usuario.id !== this.usuarioSeleccionado!.id);
      this.updatePaginatedColaboradores();
      // this.mostrarEliminar = false;
    
  }

  seleccionarUsuario(usuario: any, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    
    if (checked) {
      this.usuarioSeleccionado = usuario; 
    } else {
      this.usuarioSeleccionado = null; 
    }
  }
}
