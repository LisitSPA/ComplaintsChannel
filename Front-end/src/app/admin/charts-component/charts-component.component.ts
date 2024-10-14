import { Component, ViewChild, OnInit } from '@angular/core';
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
export class ChartsAdmin implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartData: ChartData<'bar'> = {
    labels: ['Área 1', 'Área 2', 'Área 3', 'Área 4', 'Área 5'], 
    datasets: [
      { data: [45, 67, 80, 56, 33], label: 'Denuncias por Área' },  
    ],
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Gerente', 'Supervisor', 'Empleado'],  
    datasets: [{ data: [350, 450, 100] }], 
  };

  constructor() {}

  ngOnInit(): void {
    // this.loadChartData();
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0, 
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

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
}
