import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { Nft } from '../nft';
import { NftService } from '../nft.service';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.css'],
})
export class NftsComponent implements OnInit, OnDestroy {
  nftsList!: Nft[];
  nftsSubject!: BehaviorSubject<Nft[]>;
  nftsSubscription!: Subscription;

  addNftErrorMessage: string = '';
  isAddNFTFormVisible: boolean = false;
  newNft: Nft = new Nft();
  updateNft: Nft = new Nft();
  editAtIndex: number = -1;

  filterString: string = '';
  filterReverse: boolean = false;

  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  isBuying: boolean = false;
  buyingMessage: string = '';
  nftIdToBuy: string = '';
  isReadyToBuy: boolean = false;

  constructor(
    private nftService: NftService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.nftsSubject = this.nftService.getNfts();
    this.nftsSubscription = this.nftsSubject.subscribe((response) => {
      this.nftsList = response;
    });

    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
      }
    );

    this.nftService.addNftError.subscribe((response) => {
      this.addNftErrorMessage = response;
    });
  }

  addNft() {
    this.newNft.userId = this.currentUser._id!;
    this.newNft.userName = this.currentUser.username;
    this.nftService.addNft(this.newNft);
    if (this.newNft.name && this.newNft.image && this.newNft.price) {
      this.isAddNFTFormVisible = false;
      this.newNft = new Nft();
      this.addNftErrorMessage = '';
    }
  }

  startEditing(nftId: string, i: number) {
    this.updateNft = this.nftsList.find((elem) => elem._id === nftId) as Nft;
    this.editAtIndex = i;
  }

  doneEditing() {
    this.nftService.editNft(this.updateNft);
    this.updateNft = new Nft();
    this.editAtIndex = -1;
  }

  deleteNft(i: number) {
    this.nftService.deleteNft(this.nftsList[i]);
  }

  startBuying(nftId: string) {
    this.isBuying = true;
    this.nftIdToBuy = nftId;

    let nftPrice = this.nftsList.find((elem) => elem._id === nftId)?.price;
    let calculation =
      parseFloat(this.currentUser.money) - parseFloat(nftPrice!);

    if (calculation < 0) {
      this.buyingMessage = `You don't have enough money. Update your wallet please.<br>NFT price: ${nftPrice}<br>Your money: ${this.currentUser.money}`;
    } else {
      this.isReadyToBuy = true;
      this.buyingMessage = 'Are you sure you want to buy?';
    }
  }

  stopBuying() {
    this.isBuying = false;
    this.isReadyToBuy = false;
    this.nftIdToBuy = '';
    this.buyingMessage = '';
  }

  completeBuying(nftId: string) {
    let nftToUpdate = this.nftsList.find((elem) => elem._id === nftId) as Nft;
    let buyingUserToUpdate = this.currentUser as User;
    let sellingUserToUpdate = this.authService.usersList.find(
      (elem) => elem._id === nftToUpdate.userId
    );

    nftToUpdate.isOnSale = false;
    nftToUpdate.userId = this.currentUser._id!;
    nftToUpdate.userName = this.currentUser.username;
    this.nftService.editNft(nftToUpdate);

    let nftPriceString = nftToUpdate.price;
    let nftPrice = parseFloat(
      nftPriceString.substring(0, nftPriceString.length - 4)
    );

    buyingUserToUpdate.money = (
      parseFloat(buyingUserToUpdate.money) - nftPrice
    ).toFixed(2);
    this.authService.editUser(buyingUserToUpdate);

    sellingUserToUpdate!.money = (
      parseFloat(sellingUserToUpdate!.money) + nftPrice
    ).toFixed(2);
    this.authService.editUser(sellingUserToUpdate!);

    this.stopBuying();
  }

  ngOnDestroy(): void {
    this.nftsSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }
}
