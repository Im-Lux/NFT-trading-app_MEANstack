import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftsRoutingModule } from './nfts-routing.module';
import { NftsComponent } from './nfts/nfts.component';
import { NftsApiComponent } from './nfts-api/nfts-api.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { NftsDetailsComponent } from './nfts-details/nfts-details.component';
import { CheckSalePipe } from './check-sale.pipe';

@NgModule({
  declarations: [NftsComponent, NftsApiComponent, FilterPipe, NftsDetailsComponent, CheckSalePipe],
  imports: [CommonModule, NftsRoutingModule, FormsModule],
})
export class NftsModule {}
