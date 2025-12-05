import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginSignupService {
  public login_url = 'http://localhost:3000';
  public reg_url = 'http://localhost:3000';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  // authLogin(user_email: any, password: any): Observable<any> {
  //   return this.apiService.get(
  //     this.login_url + '/user?email=' + user_email + '&password=' + password
  //   );
  // }
  authLogin(user_email: any, password: any): Observable<any> {
  return this.apiService.get(
    this.login_url + '/users?email=' + user_email + '&password=' + password
  );
}

  userRegister(user_details: any): Observable<any> {
  return this.apiService.post(this.reg_url + '/users', user_details);
}


  adminLogin(user_email:any,password:any):Observable<any>{
    return this.apiService.get(this.login_url+'/user?email='+user_email+'&password='+password+'&role=admin')
  }


}
