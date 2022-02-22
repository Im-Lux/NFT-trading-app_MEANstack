export class Nft {
  _id?: string;
  name!: string;
  image!: string;
  price!: string;
  userId!: string;
  userName!: string;
  isOnSale!: boolean;

  constructor() {
    this.name = '';
    this.image = '';
    this.price = '';
    this.userId = '';
    this.userName = '';
  }
}
