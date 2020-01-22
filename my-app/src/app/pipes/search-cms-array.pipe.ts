import { Pipe, PipeTransform } from '@angular/core';
import { CMS } from '../models/CMS';

@Pipe({
	name: 'searchCMSArray'
})
export class SearchCMSArrayPipe implements PipeTransform {

	transform(array: CMS[], args: any[]): any {
		// only if dataset array exists filter the dataset array
		if (array) {
			return array.filter(item => {
				return item.page ? item.page.toLowerCase().includes(args[0].toLowerCase()) : false ||
					item.content ? item.content.toLowerCase().includes(args[0].toLowerCase()) : false ||
					item.adminInfo ? item.adminInfo.toLowerCase().includes(args[0].toLowerCase()) : false  ||
					item.location ? item.location.toLowerCase().includes(args[0].toLowerCase()) : false;
			});
			// return array.filter(organisation => {
			// 	return organisation.firstName ? organisation.firstName.toLowerCase().includes(args[0].toLowerCase()) : false ||
			// 		organisation.surName ? organisation.surName.toLowerCase().includes(args[0].toLowerCase()) : false  ||
			// 		organisation.email ? organisation.email.toLowerCase().includes(args[0].toLowerCase()) : false ;
			// });
		}
	}
}
