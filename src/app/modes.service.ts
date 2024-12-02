import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zone } from './models/zone';
import { Mode } from './models/Mode';
import { LoginService } from './login.service';
import { Status } from './models/Status';

@Injectable({
  providedIn: 'root'
})
export class ModesService {

  constructor(private http:HttpClient,private loginService:LoginService) { }

  getZones():Observable<Zone[]> {
    return this.http.get<Zone[]>("https://674531d6b4e2e04abea50775.mockapi.io/alarm-zones");
  }
  getModes():Observable<Mode[]>{
    return this.http.get<Mode[]>("https://674531d6b4e2e04abea50775.mockapi.io/alarm-mode?userId="+this.loginService.user.id);
  }

  createMode(mode:RequestMode){
    console.log(mode)
    return this.http.post("https://674531d6b4e2e04abea50775.mockapi.io/alarm-mode",mode)
  }

  changeStatus(request:Status){
    return this.http.post("https://6317ca93f6b281877c5d7785.mockapi.io/alarm-status",request)
  }
}
