import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionFilters'
})
export class RegionFiltersPipe implements PipeTransform {

  transform(value: any[], args): any {
    return value.filter(eachItem => {
      return eachItem.region.toLowerCase().includes(args.toLowerCase()) || eachItem
    });
  }
}
