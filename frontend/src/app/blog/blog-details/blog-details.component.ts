import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blogId!: string;

  blogToShow!: Blog;

  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  isAddCommentFormVisible: boolean = false;
  newComment: Comment = new Comment();

  updateComment: Comment = new Comment();
  editAtIndex: number = -1;

  commentForm!: FormGroup;

  constructor(
    private queryId: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.blogId = this.queryId.snapshot.params['_id'];

    if (this.blogService.blogsList.find((elem) => elem._id === this.blogId)) {
      this.blogService
        .getIndividualBlog(this.blogId)
        .subscribe((response: any) => {
          this.blogToShow = response;
        });
    } else {
      this.router.navigate([this.blogId, 'error']);
    }

    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
      }
    );

    this.commentForm = this.formBuilder.group({
      comment: new FormControl('', Validators.required),
    });
  }

  addComment() {
    this.newComment.userId = this.currentUser._id!;
    this.newComment.userName = this.currentUser.username;
    this.newComment.comment = this.commentForm.value.comment;

    this.blogToShow.comments.push(this.newComment);
    this.blogService.editBlog(this.blogToShow);

    this.newComment = new Comment();
    this.isAddCommentFormVisible = false;
    this.commentForm.reset();
  }

  startEditingComment(commentId: string, index: number) {
    this.updateComment = this.blogToShow.comments.find(
      (elem) => elem._id === commentId
    ) as Comment;
    this.editAtIndex = index;
  }

  doneEditingComment() {
    this.blogService.editBlog(this.blogToShow);
    this.updateComment = new Comment();
    this.editAtIndex = -1;
  }

  deleteComment(commentId: string) {
    this.blogToShow.comments = this.blogToShow.comments.filter(
      (elem) => elem._id !== commentId
    );
    this.blogService.editBlog(this.blogToShow);
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
