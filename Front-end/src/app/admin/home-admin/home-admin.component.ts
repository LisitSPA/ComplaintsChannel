import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAccessAdmin } from '../quick-access-component/quick-access-component.component';
import { HeaderAdmin } from '../header-component/header-admin.component';
import { ChartsAdmin } from '../charts-component/charts-component.component';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardSummaryComponent } from '../dashboard-summary/dashboard-summary.component';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { DenunciasTableComponent } from "../denuncias/denuncias-table/denuncias-table.component";
@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, DashboardSummaryComponent,  BaseChartDirective, HeaderAdmin, QuickAccessAdmin, SidebarAdmin, ChartsAdmin, DenunciasTableComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
