import { Component } from '@angular/core';
import { SidebarAdmin } from "../admin/admin/sidebar-component/sidebar-admin.component";
import { HeaderAdmin } from "../admin/header-component/header-admin.component";
import { QuickAccessAdmin } from "../admin/quick-access-component/quick-access-component.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarAdmin, HeaderAdmin, QuickAccessAdmin, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
