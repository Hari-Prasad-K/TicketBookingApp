import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http:HttpClient) { }

  isAuthenticated():boolean {
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }
  canAccess(){
    if(!this.isAuthenticated())
        this.router.navigate(['/login']); 
  }
  register(name:string, email:string, mobile: string, password: string){
    return this.http.post<{idToken:string}>('',
    {UserName:name,Email:email,MobileNumber: mobile,Password:password});

  }
  storeToken(token:string){
      sessionStorage.setItem("token",token);
  }

  login(email:string, password:string){
    return this.http.post<{idToken:string}>('',{Email:email, Password:password});
  }

  canAuthenticate(){
    this.router.navigate(['/dashboard']);
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
}
