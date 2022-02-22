export class User {
  _id?: string;
  username!: string;
  email!: string;
  password!: string;
  image!: string;
  description!: string;
  money!: string;
  isAdmin: boolean = false;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.image = '';
    this.description = '';
    this.money = '';
  }
}
