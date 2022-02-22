import { Pipe, PipeTransform } from '@angular/core';
import { Nft } from '../nfts/nft';

@Pipe({
  name: 'userNfts',
})
export class UserNftsPipe implements PipeTransform {
  transform(nfts: Nft[], userId: string): Nft[] {
    return nfts.filter((elem) => elem.userId === userId);
  }
}
