import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {
  transform(value: string): any {
    // console.log(value, value.length)
    return value.trim();
  }
}
