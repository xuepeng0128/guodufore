import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTextFilter'
})
export class ArrayTextFilterPipe implements PipeTransform {

  transform(value: Array<any>, args: {keyName: string, filterText: string}): Array<any> {

   return  value.filter(o => (o[args.keyName] as string).indexOf(args.filterText)  !== -1 );
  }

}
