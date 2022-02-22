import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { Blog } from 'src/app/blog/blog';
import { BlogService } from 'src/app/blog/blog.service';
import { Meme } from 'src/app/memes/meme';
import { MemesService } from 'src/app/memes/memes.service';
import { Nft } from 'src/app/nfts/nft';
import { NftService } from 'src/app/nfts/nft.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  usersList!: User[];
  usersSubject!: BehaviorSubject<User[]>;
  usersSubscription!: Subscription;

  nftsList!: Nft[];
  nftsSubject!: BehaviorSubject<Nft[]>;
  nftsSubscription!: Subscription;

  memesList!: Meme[];
  memesSubject!: BehaviorSubject<Meme[]>;
  memesSubscription!: Subscription;

  blogsList!: Blog[];
  blogsSubject!: BehaviorSubject<Blog[]>;
  blogsSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private nftService: NftService,
    private memeService: MemesService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
      }
    );

    this.usersSubject = this.authService.getUsers();
    this.usersSubscription = this.usersSubject.subscribe((response) => {
      this.usersList = response.filter(
        (elem) => elem._id !== this.currentUser._id
      );
    });

    this.nftsSubject = this.nftService.getNfts();
    this.nftsSubscription = this.nftsSubject.subscribe((response) => {
      this.nftsList = response;
    });

    this.memesSubject = this.memeService.getMemes();
    this.memesSubscription = this.memesSubject.subscribe((response) => {
      this.memesList = response;
    });

    this.blogsSubject = this.blogService.getBlogs();
    this.blogsSubscription = this.blogsSubject.subscribe((response) => {
      this.blogsList = response;
    });
  }

  deleteUser(userId: string) {
    this.authService.deleteUser(
      this.usersList.find((elem) => elem._id === userId) as User
    );

    this.nftsList.forEach((elem) => {
      if (elem.userId === userId) {
        this.nftService.deleteNft(elem);
      }
    });

    this.memesList.forEach((elem) => {
      if (elem.userId === userId) {
        this.memeService.deleteMeme(elem);
      }
    });
  }

  deleteNft(nftId: string) {
    this.nftService.deleteNft(
      this.nftsList.find((elem) => elem._id === nftId) as Nft
    );
  }

  deleteMeme(memeId: string) {
    this.memeService.deleteMeme(
      this.memesList.find((elem) => elem._id === memeId) as Meme
    );
  }

  deleteBlog(blogId: string) {
    this.blogService.deleteBlog(
      this.blogsList.find((elem) => elem._id === blogId) as Blog
    );
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.nftsSubscription.unsubscribe();
    this.memesSubscription.unsubscribe();
    this.blogsSubscription.unsubscribe();
  }
}
