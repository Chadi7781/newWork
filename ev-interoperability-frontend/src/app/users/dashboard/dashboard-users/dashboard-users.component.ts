import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Accord } from 'src/app/models/accord.model';
import { User } from 'src/app/models/user.model';
import { AccordService } from 'src/app/services/accord-service/accord.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.css'],
})
export class DashboardUsersComponent {
  accords = new MatTableDataSource<any>(); // Replace 'any' with the actual type of your data

  constructor(
    private sessionServ: SessionService,
    private userService: UserService,
    private accordService: AccordService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAcc();
  }

  accordData: any[] = [];

  confirmAccord(accord: Accord) {
    console.log('accord', accord._id);
    this.accordService.confirmAccord(accord._id).subscribe((res) => {
      this.toastr.info('accord confirmed');
    });
    window.location.reload();
  }
  refuseAccord(accord: Accord) {
    console.log('accord', accord._id);
    this.accordService.refuseAccord(accord._id).subscribe((res) => {
      this.toastr.info('accord refused');

      window.location.reload();
    });
    window.location.reload();
  }
  loadAcc() {
    const connectedUser = JSON.parse(localStorage.getItem('user')!);
    this.accordService.getAllAccords().subscribe((accords) => {
      accords.accords.map((data: any) => {
        console.log(data);
        console.log(connectedUser._id);

        if (data.idUser === connectedUser._id) {
          this.accordData.push(data);
          this.accords.data = this.accordData;
          console.log(this.accords.data);
        }
      });
    });
  }

  sendAccord(user: User): void {
    const id = user._id ?? '';

    this.accordService
      .sendAccord(JSON.parse(localStorage.getItem('user')!), id)
      .subscribe(
        (accord: any) => {
          const user = JSON.parse(localStorage.getItem('user')!);
          console.log(user._id);
          console.log(accord.accord.user._id);

          if (accord.accord.user._id === user._id) {
            alert('ok');
          }
          this.toastr.info('Accord sent successfully:', accord);

          // Handle success, update UI, etc.
        },
        (error) => {
          console.error('Error sending accord:', error);
          // Handle error, show error message, etc.
        }
      );
  }

  getAccord() {
    // const user = JSON.parse(localStorage.getItem('user')!);
    // this.accordService.getAccord(user._id).subscribe((accords) => {
    //   console.log(accords);
    // });
  }
}
