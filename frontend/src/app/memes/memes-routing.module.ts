import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemesComponent } from './memes/memes.component';

const routes: Routes = [{ path: '', component: MemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemesRoutingModule {}
