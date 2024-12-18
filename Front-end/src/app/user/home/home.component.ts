import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { InformationComponent } from '../information/information.component';
import { FaqComponent } from '../faq/faq.component';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { ComplaintService } from '../../services/complaint.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HowItWorksComponent,
    InformationComponent,
    FaqComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private complaintDataService: ComplaintDataService,
    private complaintService: ComplaintService
  ) {}

  async ngOnInit(): Promise<void> {}

  async getData() {}
}
