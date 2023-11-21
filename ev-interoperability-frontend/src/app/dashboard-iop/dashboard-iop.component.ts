import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user-service/user.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-dashboard-iop',
  templateUrl: './dashboard-iop.component.html',
  styleUrls: ['./dashboard-iop.component.css'],
})
export class DashboardIopComponent {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private sessionServ: SessionService
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    console.log('Current user:', currentUser);
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    // Implement edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: User): void {
    // Implement delete functionality
    console.log('Delete user:', user);
  }
}
