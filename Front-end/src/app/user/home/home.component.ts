import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { InformationComponent } from '../information/information.component';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HowItWorksComponent, InformationComponent, FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
