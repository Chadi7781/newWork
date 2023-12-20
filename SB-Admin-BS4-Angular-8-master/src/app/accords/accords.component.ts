// user-table.component.ts

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import { Accord } from '../models/accord.model';
import { User } from '../models/user.model';

@Component({
    selector: 'app-accord-table',
    templateUrl: './accords.component.html',
    styleUrls: ['./accords.component.css']
})
export class AccordsComponent implements OnInit {
    @Input() accords: Accord[] = [];

    @Output() accordUser = new EventEmitter<Accord>();
    @Output() sendAccordUser = new EventEmitter<User>();
    @Output() confirmAccordUser = new EventEmitter<Accord>();
    @Output() refuseAccordUser = new EventEmitter<Accord>();

    constructor(private sessionS: SessionService) {}

    ngOnInit(): void {
        console.log(this.accords);
    }

    sendAccord(user: User) {
        this.sendAccordUser.emit(user);
    }

    confirmAccord(accord: Accord) {
        this.confirmAccordUser.emit(accord);
    }

    refuseAccord(accord: Accord) {
        this.refuseAccordUser.emit(accord);
    }
}
