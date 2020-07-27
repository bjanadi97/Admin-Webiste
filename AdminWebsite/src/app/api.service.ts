import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:8000/";
  username="Janadi";
  password= "janadi2.";
  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
  });

  constructor(private http: HttpClient) {   }


  //ADMIN
  getAllDogs(): Observable<any>{
    return this.http.get(this.baseurl + 'dogs/',
    {headers: this.httpHeaders});

  }
  loginAdmin(userData): Observable<any>{
    return this.http.post(this.baseurl + 'auth/',userData,
    {headers: this.httpHeaders});

  }

  SignOut(): Observable<any>{
    return this.http.post(this.baseurl + 'admin/logout',
    {headers: this.httpHeaders});

  }


  //DOG DATA

  //Daily
  getTotalMinutesPerDay(data): Observable<any>{
    return this.http.post(this.baseurl + 'getTotalMinutesPerDay',data,
    {headers: this.httpHeaders});

  }
  //Weekly
  getTotalMinutesPerWeek(data): Observable<any>{
    return this.http.post(this.baseurl + 'getTotalMinutesPerWeek',data,
    {headers: this.httpHeaders});
  }
  getTotalMinutesPerDayInWeek(data): Observable<any>{
    return this.http.post(this.baseurl + 'getTotalMinutesPerDayInWeek',data,
    {headers: this.httpHeaders});
  }
  //Monthly
  getTotalMinutesPerMonth(data): Observable<any>{
    return this.http.post(this.baseurl + 'getTotalMinutesPerMonth',data,
    {headers: this.httpHeaders});

  }
  getWeeklyDetailsInMonth(data): Observable<any>{
    return this.http.post(this.baseurl + 'getWeeklyDetailsInMonth',data,
    {headers: this.httpHeaders});
  }
  //Anually
  getTotalMinutesPerYear(data): Observable<any>{
    return this.http.post(this.baseurl + 'getTotalMinutesPerYear',data,
    {headers: this.httpHeaders});
  }
  getMonthlyDetailsInYear(data): Observable<any>{
    return this.http.post(this.baseurl + 'getMonthlyDetailsInYear',data,
    {headers: this.httpHeaders});
  }



}
