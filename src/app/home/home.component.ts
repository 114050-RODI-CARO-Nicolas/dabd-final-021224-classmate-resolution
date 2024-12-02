import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
logout() {
  this.loginService.logout();
  this.router.navigate([""]);
}
  constructor(private loginService:LoginService,private router:Router){

  }
}
