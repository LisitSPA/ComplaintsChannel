import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../admin/header-component/header-admin.component';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';


interface Denuncia {
  id: string;
  motivo: string;
  fecha: string;
  anonimo: string;
  estado: string;
  evidencias: string;
  chat: string;
}

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [CommonModule,SidebarAdmin,HeaderAdmin],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css'
})
export class DenunciasComponent {
  denuncias: Denuncia[] = [
    {
      id: '00000',
      motivo: 'motivo',
      fecha: '0000',
      anonimo: 'anónimo',
      estado: 'activo',
      evidencias:'evidencias',
      chat:'chat'
    },
    {
      id: '00000',
      motivo: 'motivo',
      fecha: '0000',
      anonimo: 'anónimo',
      estado: 'activo',
      evidencias:'evidencias',
      chat:'chat'
    },
    {
      id: '00000',
      motivo: 'motivo',
      fecha: '0000',
      anonimo: 'anónimo',
      estado: 'activo',
      evidencias:'evidencias',
      chat:'chat'
    },
    {
      id: '00000',
      motivo: 'motivo',
      fecha: '0000',
      anonimo: 'anónimo',
      estado: 'activo',
      evidencias:'evidencias',
      chat:'chat'
    },
    {
      id: '00000',
      motivo: 'motivo',
      fecha: '0000',
      anonimo: 'anónimo',
      estado: 'activo',
      evidencias:'evidencias',
      chat:'chat'
    },
    
  ];

  paginatedColaboradores: Denuncia[] = [];
  currentPage = 1;
  itemsPerPage = 7;

  constructor() {
    this.updatePaginatedColaboradores();
  }

  get totalPages() {
    return Math.ceil(this.denuncias.length / this.itemsPerPage);
  }

  updatePaginatedColaboradores() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColaboradores = this.denuncias.slice(start, end);
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
  isListView = false; // Variable para manejar el estado de la vista

  toggleView() {
    this.isListView = !this.isListView; // Cambia entre vista de tabla y lista
  }
}
