import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { MemesModule } from './memes/memes.module';
import { NftsModule } from './nfts/nfts.module';
import { ProfileModule } from './profile/profile.module';
import { RestrictionsGuard } from './restrictions.guard';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  { path: 'admin', loadChildren: () => AdminModule, canActivate: [AdminGuard] },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'profile', loadChildren: () => ProfileModule },
  {
    path: 'blog',
    loadChildren: () => BlogModule,
    canActivate: [RestrictionsGuard],
  },
  {
    path: 'memes',
    loadChildren: () => MemesModule,
    canActivate: [RestrictionsGuard],
  },
  { path: '', loadChildren: () => NftsModule },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
