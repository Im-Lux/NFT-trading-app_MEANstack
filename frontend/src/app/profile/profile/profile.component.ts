import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { Nft } from 'src/app/nfts/nft';
import { NftService } from 'src/app/nfts/nft.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  nftsList!: Nft[];
  nftsSubject!: BehaviorSubject<Nft[]>;
  nftsSubscription!: Subscription;

  usersList!: User[];
  usersSubject!: BehaviorSubject<User[]>;
  usersSubscription!: Subscription;

  isAddingMoney: boolean = false;
  amountOfMoney: number = 0;
  isEditing: boolean = false;

  showUser!: User;

  moneyForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private nftService: NftService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
        this.showUser = this.authService.currentUser;
      }
    );

    this.nftsSubject = this.nftService.getNfts();
    this.nftsSubscription = this.nftsSubject.subscribe((response) => {
      this.nftsList = response;
    });

    this.usersSubject = this.authService.getUsers();
    this.usersSubscription = this.usersSubject.subscribe((response) => {
      this.usersList = response;
    });

    this.moneyForm = this.formBuilder.group({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
      amount: new FormControl('', Validators.required),
    });
  }

  switchUser(userId: string) {
    this.showUser =
      this.usersList.find((elem) => elem._id === userId) || this.currentUser;
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  editUser() {
    this.currentUser.money = (
      parseFloat(this.currentUser.money) + this.amountOfMoney
    ).toString();
    this.isEditing = false;
    this.isAddingMoney = false;
    this.amountOfMoney = 0;
    this.authService.editUser(this.currentUser);
    this.showUser = this.currentUser;
  }

  isNftOnSale(nftId: string) {
    let nftEdit = this.nftsList.find((elem) => elem._id === nftId);
    nftEdit!.isOnSale = !nftEdit!.isOnSale;
    this.nftService.editNft(nftEdit as Nft);
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
    this.nftsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
