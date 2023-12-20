import { Component, OnInit } from '@angular/core';
import { Accord } from '../models/accord.model';
import { User } from '../models/user.model';
import { AccordService } from '../services/accord-service/accord.service';
import { SessionService } from '../services/session/session.service';
import { UserService } from '../services/user-service/user.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
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
        alert('ok');
        this.role   
        = JSON.parse(this.sessionServ.getCurrentUser()).role;

        this.loadUsers();
        this.loadAccords();
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
}
