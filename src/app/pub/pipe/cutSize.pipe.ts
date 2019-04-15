import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'cutSizePipe',
})
export class CutSizePipe implements PipeTransform {
  transform(value: string, args: number): string {
    if (isNullOrUndefined(value) || value === '') {
      return value;
    } else {
      const newStrValue = value.substr(0, value.length - 1);
      const newValue = parseFloat(newStrValue).toFixed(args);
      // const newValue = Math.round(parseFloat(newStrValue)*Math.pow(10, 2))/Math.pow(10, 2);
      return newValue.toString() + value.substr(value.length - 1, 1);
    }
  }
}
