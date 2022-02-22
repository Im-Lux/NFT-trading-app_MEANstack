export class Comment {
  _id?: string;
  comment!: string;
  timestamp!: string;
  userId!: string;
  userName!: string;

  constructor() {
    this.comment = '';
    this.timestamp = new Date().toString().substring(4, 24);
    this.userId = '';
    this.userName = '';
  }
}
