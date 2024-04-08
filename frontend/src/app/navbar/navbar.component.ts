import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IdentityService } from '../identity/identity.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(private router:Router, public identityService: IdentityService,
  @Inject(DOCUMENT) private document: Document){
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
      const token = localStorage.getItem("token");
      if(token) this.identityService.getCurrentUser(token).subscribe();
    }
   
  }
  
  ngOnInit(): void {
  }
  goToRegister(){
    this.router.navigate(['/identity/register'])
  }
  goToLogin(){
    this.router.navigate(['/identity/login'])
  }

  logout(){
    this.identityService.logout();
  }
}
