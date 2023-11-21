// user-table.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Accord } from 'src/app/models/accord.model';
import { User } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-accord-table',
  templateUrl: './accords.component.html',
  styleUrls: ['./accords.component.css'],
})
export class AccordsComponent implements OnInit {
  @Input()
  accords = new MatTableDataSource<any>(); // Replace 'any' with the actual type of your data

  @Output() accordUser = new EventEmitter<Accord>();

  @Output() sendAccordUser = new EventEmitter<User>();
  @Output() confirmAccordUser = new EventEmitter<Accord>();

  @Output() refuseAccordUser = new EventEmitter<Accord>();

  displayedColumns: string[] = ['username', 'email', 'actions'];

  constructor(private sessionS: SessionService) {}

  ngOnInit(): void {
    console.log(this.accords);
  }

  // onEdit(user: User): void {
  //   this.editUser.emit(user);
  // }

  // onDelete(user: User): void {
  //   this.deleteUser.emit(user);
  // }

  sendAccord(user: User) {
    this.sendAccordUser.emit(user);
  }
  getAccord(accord: Accord) {
    this.accordUser.emit(accord);
  }
  confirmAccord(accord: Accord) {
    this.confirmAccordUser.emit(accord);
  }

  refuseAccord(accord: Accord) {
    this.refuseAccordUser.emit(accord);
  }
}
