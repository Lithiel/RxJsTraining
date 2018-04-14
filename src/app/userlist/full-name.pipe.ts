import { Pipe, PipeTransform } from '@angular/core';
import {User} from "./user";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, shortened?: boolean): any {
    let forename = user.forename;
    if (shortened){
      forename = user.forename.charAt(0) + ".";
    }
    return `${forename} ${user.surname}`;
  }

}
