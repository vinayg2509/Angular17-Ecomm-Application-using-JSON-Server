import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private readonly USER_URL = 'http://localhost:3000/users';
  private readonly PRODUCT_URL = 'http://localhost:3000/products';

  constructor(private apiService: ApiService) {}

  /* Dashboard */
  userDashBoard(): Observable<any> {
    return this.apiService.get(this.USER_URL);
  }

  productDashBoard(): Observable<any> {
    return this.apiService.get(this.PRODUCT_URL);
  }

  /* Users CRUD */

  allUsers(): Observable<any> {
    return this.apiService.get(this.USER_URL);
  }

  addUser(userData: any): Observable<any> {
    return this.apiService.post(this.USER_URL, userData);
  }

  getSingleUser(userId: number): Observable<any> {
    return this.apiService.get(`${this.USER_URL}/${userId}`);
  }

  editUser(userId: number, userData: any): Observable<any> {
    return this.apiService.put(`${this.USER_URL}/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.apiService.delete(`${this.USER_URL}/${userId}`);
  }
}
