import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private currentUser: any;

  private isConnected = new BehaviorSubject<boolean>(this.getInitialStatus());

  setCurrentUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return localStorage.getItem('user');
  }

  private getInitialStatus(): boolean {
    const storedStatus = localStorage.getItem('user');
    return storedStatus ? JSON.parse(storedStatus) : false;
  }

  setConnectivityStatus(status: boolean): void {
    this.isConnected.next(status);
    // Update local storage
  }

  getConnectivityStatus(): Observable<boolean> {
    return this.isConnected.asObservable();
  }
}
