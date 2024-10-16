import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../header-component/header-admin.component';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { DenunciasTableComponent } from "./denuncias-table/denuncias-table.component";

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [CommonModule, SidebarAdmin, HeaderAdmin, FormsModule, DenunciasComponent, DenunciasTableComponent],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css'
})
export class DenunciasComponent implements OnInit {
  denuncias: any[] = [];  
  paginated: any[] = [];
  currentPage = 1;
  itemsPerPage = 7;
  selectedEstado: string = ''; 
  selectedFiltro: string = ''; 
  isListView = false;

  viewMode: 'realizadas' | 'desestimadas' = 'realizadas';
  status : number = 0;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit() {
  }


  changeViewMode(mode: 'realizadas' | 'desestimadas') {
    this.viewMode = mode; 
    this.currentPage = 1; 
    if (mode === 'realizadas') {
      this.status = 0
    } else{
      this.status = 31
    }
  }

  toggleView() {
    this.isListView = !this.isListView; 
  }
 
}
