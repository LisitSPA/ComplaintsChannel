import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charts-component',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts-component.component.html',
  styleUrls: ['./charts-component.component.css'],
})
export class ChartsAdmin {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  // Configuración del gráfico de barras
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: ['area', 'area', 'area'],
    datasets: [
      { data: [65, 59, 80], label: 'Series A' },
      { data: [28, 48, 40], label: 'Series B' },
    ],
  };

  // Configuración del gráfico de dona
  public doughnutChartLabels: string[] = [
    'Listas para supervisar',
    'Listas para supervisar',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350,50] },
    ],
  };
  public doughnutChartType: 'doughnut' = 'doughnut';

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];
    this.chart?.update();
  }
}
