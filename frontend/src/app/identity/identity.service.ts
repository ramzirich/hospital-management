import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { User } from '../models/Users';
import { environment } from '../../environment';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  baseUrl = environment.apiUrl;
  private currentUserSource  = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  checkEmailExist(email: string){
    return this.http.get<boolean>(this.baseUrl + "/identity/emailExist?email=" + email)
  }

  login (values: User){
    return this.http.post<User>(this.baseUrl + '/identity/login', values).pipe(
      map(user =>{
        localStorage.setItem("token", user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  register (values: User){
    return this.http.post<User>(this.baseUrl + '/identity/register', values).pipe(
      map(user =>{
        localStorage.setItem("token", user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
