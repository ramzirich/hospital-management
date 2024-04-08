import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IdentityService } from './identity/identity.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private identityService: IdentityService, @Inject(DOCUMENT) private document: Document){
    // const localStorage = document.defaultView?.localStorage;
    // if(localStorage){
    //   const token = localStorage.getItem("token");
    //   if(token) this.identityService.getCurrentUser(token).subscribe();
    // }
  }
}
