import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Default HTTP headers used for all API requests
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Note: This header does NOT fix CORS issues on client side.
      // CORS must be enabled on server.
      'Access-Control-Allow-Access': '*',
    }),
  };

  constructor(private httpMethod: HttpClient) {}

  /**
   * Handle API errors and return a readable error message.
   * @param error - Error returned from backend
   * @returns Observable that throws an error
   */
  private formatError(error: any) {
    return throwError(error.error);
  }

  /**
   * GET Request Wrapper
   * @param path - API endpoint URL
   * @param params - Optional query params
   * @returns Observable with API response
   */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpMethod
      .get(path, { params })
      .pipe(catchError(this.formatError));
  }
  /**
   * PUT Request Wrapper
   * @param path - API endpoint URL
   * @param body - Request payload (object that will be updated on server)
   * @returns Observable with API response
   */
  put(path: string, body: Object = {}): Observable<any> {
    return this.httpMethod
      .put(path, JSON.stringify(body), this.httpOption) // Send payload as JSON
      .pipe(catchError(this.formatError)); // Handle API errors
  }

  /**
   * POST Request Wrapper
   * @param path - API endpoint URL
   * @param body - Request payload that will be sent to server
   * @returns Observable with API response
   */
  post(path: string, body: Object = {}): Observable<any> {
    return this.httpMethod
      .post(path, JSON.stringify(body), this.httpOption) // Convert payload to JSON string
      .pipe(catchError(this.formatError)); // Handle errors globally
  }

  /**
   * DELETE Request Wrapper
   * @param path - API URL of the item to delete
   * @returns Observable with API response
   */
  delete(path: string): Observable<any> {
    return this.httpMethod
      .delete(path, this.httpOption) // Send delete request
      .pipe(catchError(this.formatError)); // Error handling
  }
}
