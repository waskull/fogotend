import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }
  public create(complaint: any) {
    return this.httpClient.post<any>(`${this.baseURL}/complaint/`, complaint);
  }

  public update(complaint: any, id:number) {
    return this.httpClient.patch<any>(`${this.baseURL}/complaint/${id}`, complaint);
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/complaint/${id}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/complaint`);
  }
  public getAllByFiltering(filter:string): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/complaint/custom/${filter}`);
  }

  public getAllBy(filter:string): Observable<any[]>{
    return this.httpClient.post<any[]>(`${this.baseURL}/complaint`,filter);
  }
}
