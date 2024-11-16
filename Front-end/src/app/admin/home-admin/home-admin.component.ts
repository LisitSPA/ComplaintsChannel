import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAccessAdmin } from '../quick-access-component/quick-access-component.component';
import { ChartsAdmin } from '../charts-component/charts-component.component';
import { DashboardSummaryComponent } from '../dashboard-summary/dashboard-summary.component';
import { DenunciasTableComponent } from "../denuncias/denuncias-table/denuncias-table.component";
@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, DashboardSummaryComponent, QuickAccessAdmin, ChartsAdmin, DenunciasTableComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
