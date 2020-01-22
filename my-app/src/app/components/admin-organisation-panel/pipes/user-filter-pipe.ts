import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../../../models/user";

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[],  searchFilter: string): User[] {
    if (!users || !searchFilter) {
      return users;
    }

    return users.filter(user =>
      user.email.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1);
  }

}
