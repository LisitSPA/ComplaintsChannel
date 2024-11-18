import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, Colors } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import getPoolColors from '../../../utilities/getPoolColors';

@Component({
  selector: 'app-charts-component',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts-component.component.html',
  styleUrls: ['./charts-component.component.css']
})
export class ChartsAdmin implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Denuncias por Área' }],
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      }
    },
    responsive: true,
    datasets: {
      bar: {
        barPercentage: 0.9,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public barChartType = 'bar' as const;
  
  public doughnutChartType: 'doughnut' = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    plugins: {
      legend: {
        display: true,
      },
    },
    datasets: {
      doughnut: {
        hidden: true,
      }
    },
  }

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadChartData();
    this.loadDoughnutChartData();
  }

  loadChartData() {
    this.dashboardService.getChartByArea().subscribe((res) => {
      let labels = res.content.map((x: any) =>
        x.name == null ? 'Desconocida' : x.name
      );
      let data = res.content.map((x: any) => x.total);

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            label: 'Denuncias por Área',
            backgroundColor: getPoolColors(data.length),
          },
        ],
      };
    });
  }

  loadDoughnutChartData() {
    this.dashboardService.getChartByPosition().subscribe((res) => {
      let labels = res.content.map((x: any) =>
        x.name == null ? 'Desconocido' : x.name
      );
      let data = res.content.map((x: any) => x.total);

      this.doughnutChartData = {
        labels: labels,
        datasets: [{ data: data }],
      };
    });
  }
}
