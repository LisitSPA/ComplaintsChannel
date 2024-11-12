import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.css'
})
export class DashboardSummaryComponent implements OnInit {
  totalDenuncias: number = 0;
  denunciasEnProceso: number = 0;
  accionesPendientes: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getCountComplaints().subscribe(
      (res) => {
        let data = res.content;
        this.totalDenuncias = data.totalComplaints;  
        this.denunciasEnProceso = data.complaintsInProcess;
        this.accionesPendientes = data.pendingComplaints;
      },
      (error) => {
        console.error('Error al obtener datos del dashboard:', error);
      }
    );
  }
}
