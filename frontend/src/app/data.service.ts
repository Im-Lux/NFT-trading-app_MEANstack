import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './auth/user';
import { Blog } from './blog/blog';
import { Meme } from './memes/meme';
import { Nft } from './nfts/nft';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  nftsApiUrl: string = `${environment.API_URL}/api/nfts`;
  usersApiUrl: string = `${environment.API_URL}/api/users`;
  memesApiUrl: string = `${environment.API_URL}/api/memes`;
  blogsApiUrl: string = `${environment.API_URL}/api/blogs`;

  constructor(private http: HttpClient) {}

  // NFTS - API

  // get all NFTs
  getNfts() {
    return this.http.get(this.nftsApiUrl);
  }

  // add new NFT
  addNft(nft: Nft) {
    return this.http.post(this.nftsApiUrl, nft);
  }

  // edit NFT
  editNft(nft: Nft) {
    return this.http.put(this.nftsApiUrl, nft);
  }

  // delete NFT
  deleteNft(nft: Nft) {
    return this.http.delete(`${this.nftsApiUrl}/${nft._id}`);
  }

  // get individual NFT
  getIndividualNft(nftId: string) {
    return this.http.get(`${this.nftsApiUrl}/${nftId}`);
  }

  // USERS - API

  // get all Users
  getUsers() {
    return this.http.get(this.usersApiUrl);
  }

  // register new User
  registerUser(user: User) {
    return this.http.post(`${this.usersApiUrl}/register`, user);
  }

  // login current User
  loginUser(user: { username: string; password: string }) {
    return this.http.post(`${this.usersApiUrl}/login`, user);
  }

  // edit current User
  editUser(user: User) {
    return this.http.put(this.usersApiUrl, user);
  }

  // delete User
  deleteUser(user: User) {
    return this.http.delete(`${this.usersApiUrl}/${user._id}`);
  }

  // MEMES - API

  // get all Memes
  getMemes() {
    return this.http.get(this.memesApiUrl);
  }

  // add new Meme
  addMeme(meme: Meme) {
    return this.http.post(this.memesApiUrl, meme);
  }

  // edit Meme (likes / dislikes)
  editMeme(meme: Meme) {
    return this.http.put(this.memesApiUrl, meme);
  }

  // delete Meme
  deleteMeme(meme: Meme) {
    return this.http.delete(`${this.memesApiUrl}/${meme._id}`);
  }

  // BLOGS - API

  // get all Blogs
  getBlogs() {
    return this.http.get(this.blogsApiUrl);
  }

  // add new Blog
  addBlog(blog: Blog) {
    return this.http.post(this.blogsApiUrl, blog);
  }

  // edit Blog
  editBlog(blog: Blog) {
    return this.http.put(this.blogsApiUrl, blog);
  }

  // delete Blog
  deleteBlog(blog: Blog) {
    return this.http.delete(`${this.blogsApiUrl}/${blog._id}`);
  }

  // get individual Blog
  getIndividualBlog(blogId: string) {
    return this.http.get(`${this.blogsApiUrl}/${blogId}`);
  }

  // CRYPTO - API

  // get cryptocurrencies
  getCryptos() {
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD`
      )
      .pipe(
        map((response: any) => {
          let cryptos = [];
          for (let crypto of response.Data) {
            cryptos.push({
              name: crypto.CoinInfo.Name,
              fullname: crypto.CoinInfo.FullName,
              price: crypto.DISPLAY.USD.PRICE,
            });
          }
          return cryptos;
        })
      );
  }
}
