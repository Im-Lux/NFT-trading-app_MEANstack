import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogsList: Blog[] = [];
  blogsSubject: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>(
    this.blogsList
  );

  constructor(private dataService: DataService) {
    this.initialize();
  }

  initialize() {
    this.dataService.getBlogs().subscribe((response) => {
      this.blogsList = response as Blog[];
      this.blogsSubject.next(this.blogsList);
    });
  }

  getBlogs() {
    return this.blogsSubject;
  }

  addBlog(blog: Blog) {
    this.dataService.addBlog(blog).subscribe((response) => {
      this.blogsList.push(blog);
      this.blogsSubject.next(this.blogsList);
      this.initialize();
    });
  }

  editBlog(blog: Blog) {
    this.dataService.editBlog(blog).subscribe((response) => {
      let editIndex = this.blogsList.findIndex((elem) => elem._id === blog._id);
      this.blogsList[editIndex] = blog;
      this.blogsSubject.next(this.blogsList);
    });
  }

  deleteBlog(blog: Blog) {
    this.dataService.deleteBlog(blog).subscribe((response) => {
      this.blogsList = this.blogsList.filter((elem) => elem._id !== blog._id);
      this.blogsSubject.next(this.blogsList);
    });
  }

  getIndividualBlog(blogId: string) {
    return this.dataService.getIndividualBlog(blogId);
  }
}
