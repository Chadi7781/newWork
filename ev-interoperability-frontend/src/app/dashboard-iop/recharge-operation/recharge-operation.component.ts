// recharge-operation.component.ts

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-recharge-operation',
  templateUrl: './recharge-operation.component.html',
  styleUrls: ['./recharge-operation.component.css'],
})
export class RechargeOperationComponent implements OnInit, OnDestroy {
  RechargeOperation: User[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadRechargeOperationUsers();
  }

  loadRechargeOperationUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.RechargeOperation = users.filter((user: any) => user.role === 'cpo');
      this.dtTrigger.next(true);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
