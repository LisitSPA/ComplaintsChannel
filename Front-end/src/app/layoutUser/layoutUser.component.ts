import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../user/header/header.component';
import { FooterComponent } from '../user/footer/footer.component';

@Component({
  selector: 'app-layout-user',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './layoutUser.component.html',
  styleUrl: './layoutUser.component.css'
})
export class LayoutUserComponent implements OnInit{
  ngOnInit(): void {
    
  }

}
