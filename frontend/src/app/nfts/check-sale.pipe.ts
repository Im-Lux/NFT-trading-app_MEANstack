import { Pipe, PipeTransform } from '@angular/core';
import { Nft } from './nft';

@Pipe({
  name: 'checkSale',
})
export class CheckSalePipe implements PipeTransform {
  transform(array: Nft[]): Nft[] {
    return array.filter((elem) => elem.isOnSale);
  }
}
