import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Accord } from 'src/app/models/accord.model';
import { User } from 'src/app/models/user.model';
import { HistoryService } from '../history-service/history.service';

@Injectable({
  providedIn: 'root',
})
export class AccordService {
  private apiUrl = 'http://localhost:3000/accords'; // Replace with your NestJS API URL

  constructor(
    private http: HttpClient,
    private historyService: HistoryService
  ) {}
  toObjectId(id: string): any {
    // Check if it's a valid ObjectId before conversion
    return { $oid: id };
  }

  sendAccord(user: User, userId: any): Observable<Accord> {
    const url = `${this.apiUrl}/send/${userId}`;
    return this.http.post<Accord>(url, { user });
  }

  confirmAccord(accordId: string): Observable<Accord> {
    const url = `${this.apiUrl}/confirm/${accordId}`;
    return this.http.post<Accord>(url, {}).pipe(
    
    );
  }
  refuseAccord(accordId: string): Observable<Accord> {
    const url = `${this.apiUrl}/refuse/${accordId}`;
    return this.http.post<Accord>(url, {});
  }

  getAllAccords(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url);
  }
  getAccord(idUser: any): Observable<Accord[]> {
    const url = `${this.apiUrl}/accord/${idUser}`;
    return this.http.get<Accord[]>(url);
  }
}
