import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Nft } from '../nft';
import { NftService } from '../nft.service';

@Component({
  selector: 'app-nfts-details',
  templateUrl: './nfts-details.component.html',
  styleUrls: ['./nfts-details.component.css'],
})
export class NftsDetailsComponent implements OnInit {
  nftId!: string;

  nftToShow!: Nft;

  constructor(
    private queryId: ActivatedRoute,
    private nftService: NftService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nftId = this.queryId.snapshot.params['_id'];

    if (this.nftService.nftsList.find((elem) => elem._id === this.nftId)) {
      this.nftService
        .getIndividualNft(this.nftId)
        .subscribe((response: any) => {
          this.nftToShow = response;
        });
    } else {
      this.router.navigate([this.nftId, 'error']);
    }

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  navigateBack() {
    this.router.navigate(['']);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
