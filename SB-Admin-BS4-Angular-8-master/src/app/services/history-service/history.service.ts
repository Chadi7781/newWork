// history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private apiUrl = 'http://localhost:3000/history'; // Replace with your NestJS API URL

  constructor(private http: HttpClient) {}

  createHistory(
    userId: string,
    operation: string,
    details: string
  ): Observable<any> {
    const url = `/${this.apiUrl}`;
    return this.http.post<any>(url, { userId, operation, details });
  }
    getHistory() {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
}
