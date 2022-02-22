import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataService } from '../data.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersList: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    this.usersList
  );
  registrationError: Subject<string> = new Subject<string>();
  logginError: Subject<string> = new Subject<string>();

  currentUser!: User;
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  userToken!: any;

  constructor(private dataService: DataService, private router: Router) {
    this.initialize();
    const token = localStorage.getItem('token');
    if (token) {
      this.isUserLoggedIn.next(true);
      this.currentUser = JSON.parse(token).user;
      this.userToken = JSON.parse(token).token;
    } else {
      this.isUserLoggedIn.next(false);
    }
  }

  initialize() {
    this.dataService.getUsers().subscribe((response) => {
      this.usersList = response as User[];
      this.usersSubject.next(this.usersList);
    });
  }

  getUsers() {
    return this.usersSubject;
  }

  registerUser(user: User) {
    this.dataService.registerUser(user).subscribe((response: any) => {
      if (response.status !== 400) {
        alert('Registration is successfull. Please log in now');
        this.initialize();
        this.router.navigate(['auth', 'login']);
      } else {
        this.registrationError.next(response.message);
      }
    });
  }

  loginUser(user: { username: string; password: string }) {
    this.dataService.loginUser(user).subscribe((response: any) => {
      if (response.status !== 400) {
        this.currentUser = response.user;
        localStorage.setItem(
          'token',
          JSON.stringify({ token: response.token, user: response.user })
        );
        this.userToken = response.token;
        this.isUserLoggedIn.next(true);

        alert('Logged in successfully');
        this.router.navigate(['profile']);
      } else {
        this.logginError.next(response.message);
      }
    });
  }

  editUser(user: User) {
    this.dataService.editUser(user).subscribe((response: any) => {
      this.initialize();
      localStorage.setItem(
        'token',
        JSON.stringify({ token: response.token, user: response.user })
      );
      this.userToken = response.token;
    });
  }

  deleteUser(user: User) {
    this.dataService.deleteUser(user).subscribe((response) => {
      this.initialize();
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.userToken = '';
    this.isUserLoggedIn.next(false);
    this.currentUser = new User();
    this.router.navigate(['']);
  }
}
