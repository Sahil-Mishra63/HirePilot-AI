import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.API_URL}/register`,
      data
    ).pipe(
      tap(response => {
        this.saveAuthData(response);
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.API_URL}/login`,
      data
    ).pipe(
      tap(response => {
        this.saveAuthData(response);
      })
    );
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');
  }

  getToken(): string | null {

    return localStorage.getItem('token');
  }

  getUser(): AuthResponse | null {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  private saveAuthData(response: AuthResponse): void {

    localStorage.setItem('token', response.token);

    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: response.userId,
        name: response.name,
        email: response.email
      })
    );
  }
}