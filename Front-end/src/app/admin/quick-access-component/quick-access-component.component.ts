import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-access-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quick-access-component.component.html',
  styleUrl: './quick-access-component.component.css'
})
export class QuickAccessAdmin {

}
