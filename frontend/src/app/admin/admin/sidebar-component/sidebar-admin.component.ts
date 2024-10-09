import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'] 
})
export class SidebarAdmin {
  isActive: boolean = false; 
  selectedSection: string = '';

  toggleSection(section: string) {
    this.isActive = !this.isActive;
    this.selectedSection = section; 
  }
}
