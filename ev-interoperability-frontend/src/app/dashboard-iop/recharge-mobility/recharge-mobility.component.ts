import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-recharge-mobility',
  templateUrl: './recharge-mobility.component.html',
  styleUrls: ['./recharge-mobility.component.css'],
})
export class RechargeMobilityComponent implements OnInit {
  RechargeMobility: User[] = [];

  constructor(
    private userService: UserService,
    private sessionServ: SessionService
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    console.log('Current user:', currentUser);
    this.loadRechargeMobUsers();
  }

  loadRechargeMobUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      // Assuming each user object has a 'role' property
      this.RechargeMobility = users.filter((user: any) => user.role === 'emsp');
      console.log('recharge mob', this.RechargeMobility);
    });
  }
}
