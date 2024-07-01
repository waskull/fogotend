import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRegisterUser, User } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }
  public create(user: IRegisterUser) {
    return this.httpClient.post<any>(`${this.baseURL}/user/`, user);
  }

  public createClient(user: IRegisterUser) {
    return this.httpClient.post<any>(`${this.baseURL}/user/register`, user);
  }
  
  public updateProfile(user: IRegisterUser) {
    return this.httpClient.patch<any>(`${this.baseURL}/user/profile`, user);
  }

  public update(user: User, id: number) {
    return this.httpClient.patch<any>(`${this.baseURL}/user/client/${id}`, user);
  }

  public updateUser(user: User, id: number) {
    return this.httpClient.patch<any>(`${this.baseURL}/user/edit/${id}`, user);
  }

  public delete(user: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/user/${user}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/user/clients`);
  }
  public getAllDelivery(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/user/delivery`);
  }
}
