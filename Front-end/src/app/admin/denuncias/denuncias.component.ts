import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../header-component/header-admin.component';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [CommonModule, SidebarAdmin, HeaderAdmin, FormsModule],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css'
})
export class DenunciasComponent implements OnInit {
  denuncias: any[] = [];  
  paginatedColaboradores: any[] = [];
  currentPage = 1;
  itemsPerPage = 7;
  selectedEstado: string = ''; 
  selectedFiltro: string = ''; 
  isListView = false;

  viewMode: 'realizadas' | 'desestimadas' = 'realizadas';

  constructor(private complaintService: ComplaintService) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.complaintService.getAllComplaints().subscribe(
      (data: any) => {  
        this.denuncias = data.content;
        this.updatePaginatedColaboradores();
      },
      (error) => {
        console.error('Error al cargar las denuncias realizadas:', error);
        
      }
    );
  }

  loadRealizadas() {
    this.denuncias = this.denuncias.filter(x => x.estado !== 'desestimada');
    this.updatePaginatedColaboradores();     
  }

  loadDesestimadas() {
    this.denuncias = this.denuncias.filter(x => x.estado === 'desestimada');
    this.updatePaginatedColaboradores();
  }

  // loadLocalExamples(viewMode: 'realizadas' | 'desestimadas') {
  //   const allExamples = [
  //     { id: '001', motivo: 'Motivo 1', fecha: '2024-10-01', anonimo: 'Sí', estado: 'activo', evidencias: 'Prueba 1', chat: 'Chat 1' },
  //     { id: '002', motivo: 'Motivo 2', fecha: '2024-10-02', anonimo: 'No', estado: 'desestimada', evidencias: 'Prueba 2', chat: 'Chat 2' },
  //     { id: '003', motivo: 'Motivo 3', fecha: '2024-10-03', anonimo: 'Sí', estado: 'activo', evidencias: 'Prueba 3', chat: 'Chat 3' },
  //     { id: '004', motivo: 'Motivo 4', fecha: '2024-10-04', anonimo: 'No', estado: 'desestimada', evidencias: 'Prueba 4', chat: 'Chat 4' },
  //   ];

  //   if (viewMode === 'realizadas') {
  //     this.denuncias = allExamples.filter(denuncia => denuncia.estado !== 'desestimada');
  //   } else {
  //     this.denuncias = allExamples.filter(denuncia => denuncia.estado === 'desestimada');
  //   }

  //   this.updatePaginatedColaboradores();
  // }

  get totalPages() {
    return Math.ceil(this.denuncias.length / this.itemsPerPage);
  }

  updatePaginatedColaboradores() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColaboradores = this.denuncias.slice(start, end);
  }

  changeViewMode(mode: 'realizadas' | 'desestimadas') {
    this.viewMode = mode; 
    this.currentPage = 1; 
    if (mode === 'realizadas') {
      this.loadRealizadas();
    } else {
      this.loadDesestimadas(); 
    }
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

  toggleView() {
    this.isListView = !this.isListView; 
  }

  filtrarPorEstado() {
    if (this.selectedEstado) {
      this.complaintService.filterComplaintsByStatus(this.selectedEstado).subscribe(
        (data: any[]) => {  
          this.denuncias = data;
          this.updatePaginatedColaboradores();
        },
        (error) => {
          console.error('Error al filtrar por estado:', error);
        }
      );
    } else {
      this.loadRealizadas(); 
    }
  }

  filtrarPorOtro() {
    if (this.selectedFiltro) {
      this.complaintService.filterComplaintsByField(this.selectedFiltro, 'anónimo').subscribe(
        (data: any[]) => {  
          this.denuncias = data;
          this.updatePaginatedColaboradores();
        },
        (error) => {
          console.error('Error al filtrar:', error);
        }
      );
    } else {
      this.loadRealizadas();
    }
  }

  desestimar() {
    let data = {
      complaintId : 0,
      eComplaintStatus : 1,
      notes: "",        
    };

    this.complaintService.updateStatus(data).subscribe(
        (response) => {
          console.log('Denuncia actualizada correctamente:', response);
        },
        (error) => {
          console.error('Error al actulizar la denuncia:', error);
        }
      );
  }
}
