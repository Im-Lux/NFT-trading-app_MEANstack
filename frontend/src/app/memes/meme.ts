export class Meme {
  _id?: string;
  image!: string;
  caption!: string;
  userId!: string;
  userName!: string;
  likes!: string[];
  dislikes!: string[];

  constructor() {
    this.image = '';
    this.caption = '';
    this.userId = '';
    this.userName = '';
    this.likes = [];
    this.dislikes = [];
  }
}
