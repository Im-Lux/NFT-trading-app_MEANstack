import { Comment } from './comment';

export class Blog {
  _id?: string;
  topic!: string;
  timestamp!: string;
  userId!: string;
  userName!: string;
  comments!: Comment[];

  constructor() {
    this.topic = '';
    this.timestamp = new Date().toString().substring(4, 24);
    this.userId = '';
    this.userName = '';
    this.comments = [];
  }
}
