import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestingServiceService {
  constructor(private http: HttpClient) {}

  getTestingPage(): Observable<any> {
    return this.http.get<any>('/api/testing-page'); // Fetch dynamic page data
  }
}
