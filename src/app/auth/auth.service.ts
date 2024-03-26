import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  idToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey: string = 'AIzaSyBr6BDy2idyY1wI25YS6SXi30l6N9ueEP8';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn); 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}signInWithPassword?key=${this.apiKey}`;
    return this.http.post<LoginResponse>(url, { email, password, returnSecureToken: true }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.idToken);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  getUserUID(): string | null {
    return localStorage.getItem('userUID');
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}