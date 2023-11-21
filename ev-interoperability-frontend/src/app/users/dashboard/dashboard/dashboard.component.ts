import { Component, Input, OnInit } from '@angular/core';
import { Accord } from 'src/app/models/accord.model';
import { User } from 'src/app/models/user.model';
import { AccordService } from 'src/app/services/accord-service/accord.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @Input()
  role?: string;

  users: User[] = [];
  accords: Accord[] = [];

  constructor(
    private sessionServ: SessionService,
    private userService: UserService,
    private accordService: AccordService
  ) {}

  ngOnInit(): void {
    this.role = JSON.parse(this.sessionServ.getCurrentUser()).role;

    this.loadUsers();

    this.loadAcc();
  }

  loadUsers(): void {
    if (this.role === 'emsp') {
      this.userService.getUsers().subscribe((users) => {
        this.users = users.filter((u: User) => u.role === 'cpo');
      });
    } else if (this.role === 'cpo') {
      this.userService.getUsers().subscribe((users) => {
        this.users = users.filter((u: User) => u.role === 'emsp');
      });
    }
  }
  loadAcc() {
    this.accordService.getAllAccords().subscribe((accords) => {
      accords.accords.map((acc: any) => {
        this.accords = acc;
      });
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

  sendAccord(user: User): void {
    const id = user._id ?? '';

    console.log(user);
    this.accordService
      .sendAccord(JSON.parse(localStorage.getItem('user')!), id)
      .subscribe(
        (accord: any) => {
          const user = JSON.parse(localStorage.getItem('user')!);
          console.log(user._id);
          console.log(accord);
          if (accord.accord.user._id === user._id) {
            alert('ok');
          }
          alert('Accord sent successfully');
          // Handle success, update UI, etc.
        },
        (error) => {
          console.error('Error sending accord:', error);
          // Handle error, show error message, etc.
        }
      );
  }

  getAccord(accord: Accord) {
    this.accordService.getAccord(accord.user._id).subscribe(
      (data) => {
        console.log('accord!!!! ', data);
        this.accords = data;
      },
      (error) => {
        console.error('Error sending accord:', error);
        // Handle error, show error message, etc.
      }
    );
  }
}
