import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../auth/user';

@Pipe({
  name: 'adminFilter',
})
export class AdminFilterPipe implements PipeTransform {
  transform(array: User[]): User[] {
    return array.filter((elem) => !elem.isAdmin);
  }
}
