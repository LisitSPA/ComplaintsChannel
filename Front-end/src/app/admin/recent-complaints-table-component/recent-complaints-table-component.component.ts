import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComplaintService } from '../../services/complaint.service';
import { HttpParams } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

interface Denuncia {
  id: string;
  nombre: string;
  tipo: string;
  estado: string;
}

@Component({
  selector: 'app-recent-complaints-table-component',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule],
  templateUrl: './recent-complaints-table-component.component.html',
  styleUrl: './recent-complaints-table-component.component.css'
})
export class RecentComplaintsTableAdmin {
  denuncias: any = []

  paginatedColaboradores: Denuncia[] = [];
  currentPage = 1;
  itemsPerPage = 7;

  constructor(private complaintService: ComplaintService) {
    this.updatePaginatedColaboradores();
    this.getData();
  }

  async getData(){
  
    let params = new HttpParams()
    .set('RequireTotalCount', true)

    this.denuncias = (await this.complaintService.getAllComplaintsPromise(params)).data;
    console.log(this.denuncias)
  }

  get totalPages() {
    return Math.ceil(this.denuncias?.length / this.itemsPerPage);
  }

  updatePaginatedColaboradores() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColaboradores = this.denuncias?.slice(start, end);
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
