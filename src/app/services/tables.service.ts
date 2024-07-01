import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }
  public create(tables: any) {
    return this.httpClient.post<any>(`${this.baseURL}/tables/`, tables);
  }

  public update(tables: any, id:number) {
    return this.httpClient.patch<any>(`${this.baseURL}/tables/${id}`, tables);
  }

  public cancel(id: number) {
    return this.httpClient.patch<any>(`${this.baseURL}/tables/availability/${id}`, {available:true});
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/tables/${id}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/tables`);
  }

  public getAllBy(available:boolean): Observable<any[]>{
    return this.httpClient.post<any[]>(`${this.baseURL}/tables/filter`,available);
  }
}