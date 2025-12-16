import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { User } from '../../core/Model/object-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_url="http://localhost:3000/user/"
  constructor(private http:HttpClientModule,private apiService:ApiService) { }

  // get user
  getUserData(user_id:any)
  {
    return this.apiService.get(this.user_url+user_id)
  }
  updateUserData(user_id:any,user_details:User):Observable<any>
  {
    return this.apiService.put(this.user_url+user_id,user_details)
  }
}
