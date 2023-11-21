// user-table.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Accord } from 'src/app/models/accord.model';
import { User } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() accords: Accord[] = [];

  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() accordUser = new EventEmitter<Accord>();

  @Output() sendAccordUser = new EventEmitter<User>();

  @Input() role?: string;

  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];

  constructor(private sessionS: SessionService) {}

  ngOnInit(): void {}

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onDelete(user: User): void {
    this.deleteUser.emit(user);
  }

  sendAccord(user: User) {
    this.sendAccordUser.emit(user);
  }
  getAccord(accord: Accord) {
    this.accordUser.emit(accord);
  }
}
