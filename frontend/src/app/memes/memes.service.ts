import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Meme } from './meme';

@Injectable({
  providedIn: 'root',
})
export class MemesService {
  memesList: Meme[] = [];
  memesSubject: BehaviorSubject<Meme[]> = new BehaviorSubject<Meme[]>(
    this.memesList
  );

  constructor(private dataService: DataService) {
    this.initialize();
  }

  initialize() {
    this.dataService.getMemes().subscribe((response) => {
      this.memesList = response as Meme[];
      this.memesSubject.next(this.memesList);
    });
  }

  getMemes() {
    return this.memesSubject;
  }

  addMeme(meme: any) {
    this.dataService.addMeme(meme).subscribe((response) => {
      this.memesList.push(meme);
      this.memesSubject.next(this.memesList);
      this.initialize();
    });
  }

  editMeme(meme: Meme) {
    this.dataService.editMeme(meme).subscribe((response) => {
      let editIndex = this.memesList.findIndex((elem) => elem._id === meme._id);
      this.memesList[editIndex] = meme;
      this.memesSubject.next(this.memesList);
    });
  }

  deleteMeme(meme: Meme) {
    this.dataService.deleteMeme(meme).subscribe((response) => {
      this.memesList = this.memesList.filter((elem) => elem._id !== meme._id);
      this.memesSubject.next(this.memesList);
    });
  }
}
