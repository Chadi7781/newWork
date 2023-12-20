// src/app/offre.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/models/offre.model';

@Injectable({
  providedIn: 'root',
})
export class OffreService {
  private apiUrl = 'http://localhost:3000'; // Replace with your NestJS API URL

  constructor(private http: HttpClient) {}

  createOffre(userId: string, offreData: Partial<Offre>): Observable<Offre> {
    return this.http.post<Offre>(
      `${this.apiUrl}/offres/createOffre/${userId}`,
      offreData
    );
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }

  getOffreById(offreId: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${offreId}`);
  }
  getOffresByUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/offres/offreByUser/${userId}`;
    return this.http.get(url);
  }

  updateOffre(offreId: string, updatedData: Partial<Offre>): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/${offreId}`, updatedData);
  }

  deleteOffre(offreId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${offreId}`);
  }
}
