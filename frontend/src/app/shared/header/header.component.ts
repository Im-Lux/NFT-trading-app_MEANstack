import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  constructor(public authService: AuthService) {
    // if (localStorage.getItem('token')) {
    //   this.currentUser = JSON.parse(localStorage.getItem('token') as any).user;
    // }
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
      }
    );
  }

  letsLogout() {
    this.currentUser = new User();
    this.isLoggedIn = false;
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
