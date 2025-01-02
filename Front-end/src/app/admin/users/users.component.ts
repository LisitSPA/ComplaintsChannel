import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EliminarUsuarioComponent } from '../../eliminar-usuario/eliminar-usuario.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpParams } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    EliminarUsuarioComponent,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NotifierModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  usuariosIniciales: any[] = [];
  usuarios: any[] = [];
  paginatedColaboradores: any[] = [];
  currentPage = 1;
  itemsPerPage = 7;
  mostrarFormulario: boolean = false;
  mostrarEditar: boolean = false;
  mostrarEliminar: boolean = false;
  usuarioSeleccionado: any | null = null;
  textFilter = '';

  constructor(private userService: UserService, private router: Router, private notifier: NotifierService) {
    this.obtenerUsuarios();
  }

  ngOnInit(): void {
    const isAdmin = sessionStorage.getItem('role') === 'Administrador';
    if (!isAdmin) this.router.navigate(['/homeadmin']);
  }

  obtenerUsuarios() {
    let params = new HttpParams();
    this.userService.getUsers(params).subscribe((data: any) => {
      this.usuariosIniciales = data.content.data;
      this.usuarios = this.usuariosIniciales;
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

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.updatePaginatedColaboradores();
    }
  }

  firstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.updatePaginatedColaboradores();
    }
  }

  pages() {
    let pages = [];
    const initialPage = this.currentPage - 2 > 0 ? this.currentPage - 2 : 1;
    const finalPage =
      this.currentPage + 2 < this.totalPages
        ? this.currentPage + 2
        : this.totalPages;

    for (let i = initialPage; i <= finalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedColaboradores();
  }

  
  filterUsers() {
    this.usuarios = this.usuariosIniciales.filter((usuario) => 
      usuario.names.toLowerCase().includes(this.textFilter.toLowerCase()) ||
      usuario.contactEmail?.toLowerCase().includes(this.textFilter.toLowerCase())
    );
    this.updatePaginatedColaboradores();
    this.goToPage(1);
  }

  abrirFormulario() {
    this.usuarioSeleccionado = [];
    this.mostrarEditar = true;
    this.mostrarEliminar = false;
  }

  cerrarFormulario(message?: string) {
    if(message) this.notifier.notify('success', message);
    this.mostrarEditar = false;
    // this.obtenerUsuarios();
  }

  editarUsuario(usuario: any) {
    this.mostrarEditar = true;
    this.usuarioSeleccionado = usuario;
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
    this.obtenerUsuarios();
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
