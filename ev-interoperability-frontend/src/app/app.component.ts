import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private sessionServ: SessionService) {}

  ngOnInit() {
    this.sessionServ.getConnectivityStatus().subscribe((status) => {

      this.isLoggedIn = status;
      
    });
  }
  title = 'ev-interoperability-frontend';
}
