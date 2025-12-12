import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public user_url = 'http://localhost:3000/users/';
  public product_url = 'http://localhost:3000/products/';
  public all_user_url = 'http://localhost:3000/users';

  constructor(private apiService: ApiService) {}

  userDashBoard() {
    return this.apiService.get(this.user_url);
  }

  productDashBoard() {
    return this.apiService.get(this.product_url);
  }

  allUsers(): Observable<any> {
    return this.apiService.get(this.all_user_url);
  }
  addUser(user_data: any) {
    return this.apiService.post(this.user_url + user_data);
  }
  getSingleUser(user_id: any) {
    return this.apiService.get(this.user_url + user_id);
  }
  editUser(user_id: any, user_details: any): Observable<any> {
    return this.apiService.put(this.user_url + user_id, user_details);
  }
  deleteUser(user_id:any)
  {
    return this.apiService.delete(this.user_url+user_id)
  }
}
