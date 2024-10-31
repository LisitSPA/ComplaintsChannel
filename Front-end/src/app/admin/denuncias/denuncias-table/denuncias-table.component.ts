import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ComplaintService } from '../../../services/complaint.service';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environment/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EvidenciaPopupComponent } from '../../../common/evidences-popup/evidencia.component';
import { ComplaintDataService } from '../../../services/complaint-data.service';

@Component({
  selector: 'app-denuncias-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    EvidenciaPopupComponent,
    RouterLink,
  ],
  templateUrl: './denuncias-table.component.html',
  styleUrl: './denuncias-table.component.css',
})
export class DenunciasTableComponent implements OnInit {
  denuncias: any[] = [];
  paginated: any[] = [];
  currentPage = 1;
  itemsPerPage = 7;
  selectedEstado: string = '';
  selectedFiltro: string = '';
  isListView = false;

  viewMode: 'realizadas' | 'desestimadas' = 'realizadas';
  filesUrl: any;
  allComplaints: any[] = [];
  showPopup: boolean = false;
  showActions: boolean = true;

  constructor(
    private complaintService: ComplaintService,
    private complaintDataService: ComplaintDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() isDashboard: boolean = false;
  @Input() filterStatus: number = 0;

  ngOnInit() {
    this.loadAll();
    this.filesUrl = environment.filesUrl;
  }

  async loadAll() {
    this.showPopup = false;
    let params = new HttpParams();
    //.set('RequireTotalCount', true)
    this.allComplaints = (
      await this.complaintService.getAllComplaintsPromise(params)
    ).data;

    if (this.isDashboard) {
      this.denuncias = this.allComplaints;
      this.updatePaginated();
    } else if (this.filterStatus == 31) this.loadDesestimadas();
    else this.loadRealizadas();

    this.route.paramMap.subscribe((params) => {
      this.selectedEstado = params.get('state') ?? '';
    });
    if (this.selectedEstado) {
      this.filtrarPorEstado();
    }
  }

  loadRealizadas() {
    this.showActions = true;
    this.denuncias = this.allComplaints.filter((x) => x.eStatus !== 31);
    this.updatePaginated();
  }

  loadDesestimadas() {
    this.showActions = false;
    this.denuncias = this.allComplaints.filter((x) => x.eStatus === 31);
    this.updatePaginated();
  }

  get totalPages() {
    return Math.ceil(this.denuncias.length / this.itemsPerPage);
  }

  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginated = this.denuncias.slice(start, end);
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
      this.updatePaginated();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginated();
    }
  }

  pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginated();
  }

  toggleView() {
    this.isListView = !this.isListView;
  }

  filtrarPorEstado() {
    if (this.selectedEstado) {
      this.denuncias = this.allComplaints.filter(
        (x) => x.eStatus == this.selectedEstado
      );
      this.updatePaginated();
    } else {
      this.loadRealizadas();
    }
  }

  filtrarPorOtro() {
    if (this.selectedFiltro) {
      this.denuncias = this.denuncias.sort((a, b) => b.id - a.id);
      this.updatePaginated();
    } else {
      this.loadRealizadas();
    }
  }

  initDesestimar(id: number) {
    // let data = {
    //   complaintId : id,
    //   eComplaintStatus : 31,
    //   notes: "",
    // };
    this.complaintDataService.setId(id);
    this.showPopup = true;
  }

  goToChat(denunciaId: any) {
    this.router.navigate(['chatadmin', denunciaId]);
  }
}
