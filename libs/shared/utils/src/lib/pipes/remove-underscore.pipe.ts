import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUnderscore',
  standalone: true,
})
export class ReplaceUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    return value.replace(/_/g, ' ');
  }
}
