import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { HeaderAdmin } from '../admin/header-component/header-admin.component';
import { NewUserComponent } from '../new-user/new-user.component';
import { FormsModule } from '@angular/forms';  


interface Usuario {
  id: string;
  nombre: string;
  tipo: string;
  estado: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SidebarAdmin,HeaderAdmin,NewUserComponent, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 usuarios: Usuario[] = [
    {
      id: '00000',
      nombre: 'nombre',
      tipo: 'tipo',
      estado: 'activo',
    },
  ];

  paginatedColaboradores: Usuario[] = [];
  currentPage = 1;
  itemsPerPage = 7;

  constructor() {
    this.updatePaginatedColaboradores();
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
  mostrarFormulario: boolean = false;

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
}
