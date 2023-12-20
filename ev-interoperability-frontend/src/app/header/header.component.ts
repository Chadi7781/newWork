import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input()
  isLoggedIn?: boolean;

  user!: User;

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user')!);

    this.user = currentUser;
  }

  getUserPictureUrl(fileName: string): string {
    return `http://localhost:3000/uploads/${fileName}`;
  }
}
