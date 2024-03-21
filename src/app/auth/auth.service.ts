import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}signInWithPassword?key=${this.apiKey}`;
    return this.http.post<LoginResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        console.log('Zalogowano pomyślnie:', response);
        localStorage.setItem('authToken', response.idToken);
      })
    );
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}