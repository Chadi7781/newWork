// main.component.ts
import { Component, OnInit } from '@angular/core';
import { Accord } from 'src/app/models/accord.model';
import { User } from 'src/app/models/user.model';
import { AccordService } from 'src/app/services/accord-service/accord.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  users: User[] = [];
  accords: Accord[] = [];

  role?: string;

  constructor(
    private userService: UserService,
    private sessionServ: SessionService,
    private accordServ: AccordService
  ) {}

  ngOnInit(): void {
    this.role = JSON.parse(this.sessionServ.getCurrentUser()).role;

    this.loadUsers();
    this.loadAccords();
    this.countCpoUsers();
    this.countEmspUsers();
    this.countAccords();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  loadAccords(): void {
    this.accordServ.getAllAccords().subscribe((acc) => {
      this.accords = acc;
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
  cpoUsersCount?: { cpoCount: number };
  emspUsersCount?: { emspCount: number };

  countEmspUsers() {
    this.userService.countEmspUsers().subscribe((data) => {
      this.emspUsersCount = JSON.parse(JSON.stringify(data.emspUsers)) ?? null;
    });
  }

  countCpoUsers() {
    this.userService.countCpoUsers().subscribe((data) => {
      this.cpoUsersCount = JSON.parse(JSON.stringify(data.cpoUsers)) ?? null;
    });
  }
  nombreAccords?: number;

  countAccords() {
    this.accordServ.countAccords().subscribe((result) => {
      this.nombreAccords = result.count;
    });
  }
}
