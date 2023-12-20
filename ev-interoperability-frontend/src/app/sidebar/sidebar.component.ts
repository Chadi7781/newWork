// sidebar.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private sessionServ: SessionService) {}

  @Input()
  isLoggedIn?: boolean;

  role?: string;

  user?: User;

  ngOnInit(): void {
    this.sessionServ.getConnectivityStatus().subscribe((status) => {
      this.isLoggedIn = status;
      this.user = JSON.parse(this.sessionServ.getCurrentUser());
      if (this.user?.role === 'emsp') {
        console.log('I am emsp');
      } else if (this.user?.role === 'iop') {
        

      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(route: string) {
    localStorage.removeItem('user');
    this.isLoggedIn = false;

    this.router.navigate(['/login']);
  }
}
