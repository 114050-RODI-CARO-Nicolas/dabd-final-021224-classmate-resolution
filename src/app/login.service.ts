import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logout() {
    this.user=null;
  }
 user:User;
  setUserLogin(user:User){
    this.user=user;
  }
  getUsers():Observable<User[]> {
    return this.http.get<User[]>("https://6317ca93f6b281877c5d7785.mockapi.io/users");
    
  }

  constructor(private http:HttpClient) { }
}
