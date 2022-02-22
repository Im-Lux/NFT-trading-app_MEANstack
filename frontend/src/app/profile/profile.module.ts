import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNftsPipe } from './user-nfts.pipe';
import { AdminFilterPipe } from './admin-filter.pipe';

@NgModule({
  declarations: [ProfileComponent, UserNftsPipe, AdminFilterPipe],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
