import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Denuncia {
  id: string;
  nombre: string;
  tipo: string;
  estado: string;
}

@Component({
  selector: 'app-recent-complaints-table-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-complaints-table-component.component.html',
  styleUrl: './recent-complaints-table-component.component.css'
})
export class RecentComplaintsTableAdmin {
  denuncias: Denuncia[] = [
    {
      id: '00000',
      nombre: 'nombre',
      tipo: 'tipo',
      estado: 'activo',
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
}
