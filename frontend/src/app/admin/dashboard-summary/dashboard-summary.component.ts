import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [],
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
      (data) => {
        console.log('Datos recibidos:', data);
        this.totalDenuncias = data.totalComplaints;  
        this.denunciasEnProceso = data.inProgressComplaints;
        this.accionesPendientes = data.pendingActions;
      },
      (error) => {
        console.error('Error al obtener datos del dashboard:', error);
      }
    );
  }
}
