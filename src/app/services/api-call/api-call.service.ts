import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  API_URL = 'http://localhost:8080/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Access-Control-Allow-Origin',
    }),
  };

  public getData(): Observable<any> {
    return this.http.get(this.API_URL + 'data', this.httpOptions);
  }

  public getProducts(): Observable<any> {
    return this.http.get(this.API_URL + 'items', this.httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  public getCommands(): Observable<any> {
    return this.http.get(this.API_URL + 'command', this.httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get(this.API_URL + `items/${id}`, this.httpOptions);
  }

  public getProductStock(id: number): Observable<any> {
    return this.getProductById(id).pipe(
      map((product: Product) => product.stock),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => 'An error occurred while getting product stock.'
        );
      })
    );
  }

  public postData(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'data', data, this.httpOptions);
  }

  public postOrder(order: Order): Observable<any> {
    return this.http
      .post(this.API_URL + 'command', order, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  public updateStock(id: number, quantity: number): Observable<any> {
    return this.http.put(
      this.API_URL + `items/${id}/updateStock?newStock=${quantity}`,
      {
        stock: quantity,
      }
    );
  }

  public putData(id: number, data: any): Observable<any> {
    return this.http.put(this.API_URL + `data/${id}`, data, this.httpOptions);
  }

  public deleteData(id: number): Observable<any> {
    return this.http.delete(this.API_URL + `data/${id}`, this.httpOptions);
  }
}
