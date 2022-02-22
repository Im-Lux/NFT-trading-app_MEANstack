import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftsDetailsComponent } from './nfts-details/nfts-details.component';
import { NftsComponent } from './nfts/nfts.component';

const routes: Routes = [
  { path: '', component: NftsComponent },
  { path: ':_id', component: NftsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftsRoutingModule {}
