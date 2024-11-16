import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../header-component/header-admin.component';
import { SidebarAdmin } from '../sidebar-component/sidebar-admin.component';
import { FormsModule } from '@angular/forms';
import { DenunciasTableComponent, ViewMode } from "./denuncias-table/denuncias-table.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [CommonModule, SidebarAdmin, HeaderAdmin, FormsModule, DenunciasTableComponent],
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

  viewMode: ViewMode = 'realizadas';
  status : number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    let selectedViewMode = null;

    this.route.paramMap.subscribe((params) => {
      selectedViewMode = (params.get('viewMode') as ViewMode);
    });

    if (!!selectedViewMode)
      this.changeViewMode(selectedViewMode, false);
  }


  changeViewMode(mode: ViewMode, updateUrl = true) {
    if (updateUrl)
      this.router.navigate(['/denunciasadmin', mode]);
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
