import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
	name: 'searchUserArray',
	pure: false
})
export class SearchUserArrayPipe implements PipeTransform {

	transform(array: User[], args: any[]): any {
		// only if dataset array exists filter the dataset array
		if (array) {
			return array.filter(item => {
				return item.firstName ? item.firstName.toLowerCase().includes(args[0].toLowerCase()) : false ||
					item.surName ? item.surName.toLowerCase().includes(args[0].toLowerCase()) : false  ||
					item.email ? item.email.toLowerCase().includes(args[0].toLowerCase()) : false ;
			});
		}
	}
}
