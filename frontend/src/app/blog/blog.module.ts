import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

@NgModule({
  declarations: [BlogComponent, BlogDetailsComponent],
  imports: [CommonModule, BlogRoutingModule, FormsModule, ReactiveFormsModule],
})
export class BlogModule {}
