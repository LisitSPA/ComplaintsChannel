import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotifierModule } from 'gramli-angular-notifier';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NotifierModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
