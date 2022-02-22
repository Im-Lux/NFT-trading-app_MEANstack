import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataService } from '../data.service';
import { Nft } from './nft';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  nftsList: Nft[] = [];
  nftsSubject: BehaviorSubject<Nft[]> = new BehaviorSubject<Nft[]>(
    this.nftsList
  );
  addNftError: Subject<string> = new Subject<string>();

  constructor(private dataService: DataService) {
    this.initialize();
  }

  initialize() {
    this.dataService.getNfts().subscribe((response) => {
      this.nftsList = response as Nft[];
      this.nftsSubject.next(this.nftsList);
    });
  }

  getNfts() {
    return this.nftsSubject;
  }

  addNft(nft: Nft) {
    this.dataService.addNft(nft).subscribe((response: any) => {
      if (response.status !== 400) {
        // this.nftsList.push(nft);
        this.initialize();
      } else {
        this.addNftError.next(response.message);
      }
    });
  }

  editNft(nft: Nft) {
    this.dataService.editNft(nft).subscribe((response) => {
      // this.nftsList[this.nftsList.findIndex((elem) => elem._id == nft._id)] =
      //   nft;
      // this.nftsSubject.next(this.nftsList);
      this.initialize();
    });
  }

  deleteNft(nft: Nft) {
    this.dataService.deleteNft(nft).subscribe((response) => {
      // this.nftsList = this.nftsList.filter((elem) => elem._id != nft._id);
      // this.nftsSubject.next(this.nftsList);
      this.initialize();
    });
  }

  getIndividualNft(nftId: string) {
    return this.dataService.getIndividualNft(nftId);
  }
}
