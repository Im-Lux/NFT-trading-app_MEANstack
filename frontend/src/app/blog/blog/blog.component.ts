import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogsList!: Blog[];
  blogsSubject!: BehaviorSubject<Blog[]>;
  blogsSubscription!: Subscription;

  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  isAddBlogFormVisible: boolean = false;
  newBlog: Blog = new Blog();

  blogForm!: FormGroup;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.blogsSubject = this.blogService.getBlogs();
    this.blogsSubscription = this.blogsSubject.subscribe((response) => {
      this.blogsList = response;
    });

    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
      }
    );

    this.blogForm = this.formBuilder.group({
      topic: new FormControl('', Validators.required),
    });
  }

  addBlog() {
    this.newBlog.userId = this.currentUser._id!;
    this.newBlog.userName = this.currentUser.username;
    this.newBlog.topic = this.blogForm.value.topic;
    this.blogService.addBlog(this.newBlog);

    this.newBlog = new Blog();
    this.isAddBlogFormVisible = false;
    this.blogForm.reset();
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog);
  }

  ngOnDestroy(): void {
    this.blogsSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }
}
