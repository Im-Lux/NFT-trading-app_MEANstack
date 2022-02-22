import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes/memes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MemesComponent],
  imports: [CommonModule, MemesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class MemesModule {}
