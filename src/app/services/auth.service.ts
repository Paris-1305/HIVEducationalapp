import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:3000'; // Backend URL
constructor(private http: HttpClient, private router: Router) {}

  // Register User
// Register User
register(email: string, password: string, name: string, userId: string, age: number, gender: string, educationLevel: string, healthStatus: string): Observable<any> {
  const body = {
    email,
    password,
    name,
    userId,
    age,
    gender,
    educationLevel,
    healthStatus
  };
  return this.http.post(`${this.apiUrl}/register`, body);
}


  // Login User
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Get User Profile (Authenticated request)
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user-profile`, { headers });
  }

  // Save Token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
