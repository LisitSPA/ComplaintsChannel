import { Component, OnInit } from '@angular/core';
import { SidebarAdmin } from "../admin/admin/sidebar-component/sidebar-admin.component";
import { HeaderAdmin } from "../admin/header-component/header-admin.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarAdmin, HeaderAdmin, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{


  constructor(
    private router: Router
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(!sessionStorage.getItem('token'))
          router.navigate(["/login"]) 
      }
    })
  }


  ngOnInit(): void {
    
  }

}
