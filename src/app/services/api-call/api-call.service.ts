import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient ) {}

  API_URL = 'https://api.example.com/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public getData(): Observable<any> {
    return this.http.get(this.API_URL + 'data', this.httpOptions);
  }

  public postData(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'data', data, this.httpOptions);
  }

  public putData(id: number, data: any): Observable<any> {
    return this.http.put(this.API_URL + `data/${id}`, data, this.httpOptions);
  }

  public deleteData(id: number): Observable<any> {
    return this.http.delete(this.API_URL + `data/${id}`, this.httpOptions);
  }

}
