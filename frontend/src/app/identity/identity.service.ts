import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Login, User } from '../models/Users';
import { environment } from '../../environment';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';

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

  getCurrentUser(token:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // headers = headers.set("Authorization", `Bearer ${token}`);
    console.log(headers);
    return this.http.get<User>(this.baseUrl + "/identity/account", {headers}).pipe(
      map(user =>{
        console.log(this.baseUrl + "/identity")
        localStorage.setItem("token", user.token);
        this.currentUserSource.next(user);
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(error);
      })
    );
    
  }

  login (values: Login){
    return this.http.post<User>(this.baseUrl + '/identity/login', values).pipe(
      map(user =>{
        localStorage.setItem("token", user.token);
        this.currentUserSource.next(user);
        this.router.navigateByUrl('/');
        return user
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
