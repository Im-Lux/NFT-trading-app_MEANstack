import { Pipe, PipeTransform } from '@angular/core';
import { Nft } from './nft';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(nfts: Nft[], field: string, reverse: boolean): Nft[] {
    if (field === 'price' && !reverse) {
      return this.sortPrice(nfts, field);
    } else if (field === 'price' && reverse) {
      return this.sortPrice(nfts, field).reverse();
    }

    return nfts.sort((a: any, b: any) => {
      if (a[field] > b[field]) {
        return 1;
      } else if (a[field] < b[field]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  sortPrice(array: Nft[], field: string) {
    return array.sort((a: any, b: any) => {
      let numOne = parseFloat(a[field]);
      let numTwo = parseFloat(b[field]);
      if (numOne > numTwo) {
        return 1;
      } else if (numOne < numTwo) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
