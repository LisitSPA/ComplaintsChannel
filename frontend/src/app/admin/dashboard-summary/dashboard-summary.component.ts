import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.css'
})
export class DashboardSummaryComponent {
  totalDenuncias: number = 100; // Reemplaza con la lógica adecuada
  denunciasEnProceso: number = 20; // Reemplaza con la lógica adecuada
  accionesPendientes: number = 5; // Reemplaza con la lógica adecuada
}
