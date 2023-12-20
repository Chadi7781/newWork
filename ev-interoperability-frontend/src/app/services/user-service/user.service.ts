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
    role: string,
    phone: string,
    country: string,
    address: string,
    about: string,
    picture: string
  ): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;

    const body = {
      username,
      password,
      email,
      role,
      phone,
      country,
      address,
      about,

      picture,
    };
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

  countCpoUsers(): Observable<{ cpoUsers: number }> {
    const url = `${this.apiUrl}/auth/count-cpo`;
    return this.http.get<{ cpoUsers: number }>(url);
  }

  countEmspUsers(): Observable<{ emspUsers: number }> {
    const url = `${this.apiUrl}/auth/count-emsp`;
    return this.http.get<{ emspUsers: number }>(url);
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

  updateProfileInfo(userId: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/auth/${userId}/update-profile-info`;
    return this.http.put(url, formData);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/auth/${userId}`;
    return this.http.get(url);
  }

  getUploadedImage(file: string): Observable<any> {
    const url = `${this.apiUrl}/uploads/${file}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  forgotPassword(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, body);
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const body = { newPassword };
    return this.http.post(`${this.apiUrl}/auth/reset-password/${token}`, body);
  }

  getUserDetail(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/user-details/${userId}`);
  }
}
