import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTextFilter'
})
export class ArrayTextFilterPipe implements PipeTransform {

  transform(value: Array<any>, args: {keyName: string, filterText: string}): Array<any> {

   return  value.filter(o => (<string> o[args.keyName]).indexOf(args.filterText)  !== -1 );
  }

}
