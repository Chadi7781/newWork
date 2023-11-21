import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Replace with your NestJS API URL
  constructor(private http: HttpClient, private sessionServ: SessionService) {}

  registerUser(
    username: string,
    password: string,
    email: string,
    role: string
  ): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;

    const body = { username, password, email, role };
    return this.http.post(url, body);
  }

  loginUser(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { username, password };

    return this.http.post(url, body).pipe(
      tap((user: any) => {
        this.sessionServ.setCurrentUser(user);
      })
    );
  }

  // Function to store the token in local storage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/auth/users`;
    return this.http.get(url);
  }
  getUserByToken(token: string): Observable<string> {
    const url = `${this.apiUrl}/auth/activate/${token}`;
    return this.http.get<string>(url);
  }
  activateAccount(token: string, password: string) {
    const url = `${this.apiUrl}/auth/activateAccount/${token}`;

    const body = { password };
    return this.http.post(url, body);
  }
}
