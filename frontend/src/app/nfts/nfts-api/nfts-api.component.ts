import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-nfts-api',
  templateUrl: './nfts-api.component.html',
  styleUrls: ['./nfts-api.component.css'],
})
export class NftsApiComponent implements OnInit {
  cryptos: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.dataService.getCryptos().subscribe((response: any) => {
      this.cryptos = response;
    });
  }
}
