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
import { Meme } from '../meme';
import { MemesService } from '../memes.service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css'],
})
export class MemesComponent implements OnInit, OnDestroy {
  memesList!: Meme[];
  memesSubject!: BehaviorSubject<Meme[]>;
  memesSubscription!: Subscription;

  currentUser!: User;
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;

  isAddingNewMeme: boolean = false;
  newMeme: Meme = new Meme();

  memesForm!: FormGroup;

  constructor(
    private memesService: MemesService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.memesSubject = this.memesService.getMemes();
    this.memesSubscription = this.memesSubject.subscribe((response) => {
      this.memesList = response;
    });

    this.isLoggedInSubscription = this.authService.isUserLoggedIn.subscribe(
      (response) => {
        this.isLoggedIn = response;
        this.currentUser = this.authService.currentUser;
      }
    );

    this.memesForm = this.formBuilder.group({
      image: new FormControl('', Validators.required),
      caption: new FormControl('', Validators.required),
    });
  }

  isAdding() {
    this.memesForm.reset();
    this.isAddingNewMeme = !this.isAddingNewMeme;
  }

  addMeme() {
    this.newMeme.caption = this.memesForm.value.caption;
    this.newMeme.image = this.memesForm.value.image;
    this.newMeme.userId = this.currentUser._id!;
    this.newMeme.userName = this.currentUser.username;
    this.memesService.addMeme(this.newMeme);

    this.newMeme = new Meme();
    this.isAddingNewMeme = false;
    this.memesForm.reset();
  }

  editMeme(meme: Meme, field: string) {
    if (field === 'like') {
      meme.likes.push(this.currentUser._id as string);
    } else if (field === 'dislike') {
      meme.dislikes.push(this.currentUser._id as string);
    }
    this.memesService.editMeme(meme);
  }

  deleteMeme(meme: Meme) {
    this.memesService.deleteMeme(meme);
  }

  checkIfAlreadyReacted(meme: Meme) {
    if (
      meme.likes.find((elem) => elem === this.currentUser._id) ||
      meme.dislikes.find((elem) => elem === this.currentUser._id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  reactedText(meme: Meme) {
    return meme.likes.find((elem) => elem === this.currentUser._id)
      ? 'You Like this Meme'
      : "You DON'T Like this Meme";
  }

  ngOnDestroy(): void {
    this.memesSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }
}
