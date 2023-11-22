import { Directive, HostBinding, Input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

const cardContentVariants = cva('p-6', {
  variants: {
    variant: {
      default: 'pt-0',
      no_header: 'pt-6',
      list: 'p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
export type CardContentVariants = VariantProps<typeof cardContentVariants>;

@Directive({
  selector: '[hlmCardContent]',
  standalone: true,
})
export class HlmCardContentDirective {
  private _inputs: ClassValue = '';

  @Input()
  set class(inputs: ClassValue) {
    this._inputs = inputs;
    this._class = this.generateClasses();
  }

  private _variant: CardContentVariants['variant'] = 'default';
  @Input()
  get variant(): CardContentVariants['variant'] {
    return this._variant;
  }

  set variant(value: CardContentVariants['variant']) {
    this._variant = value;
    this._class = this.generateClasses();
  }

  @HostBinding('class') _class = this.generateClasses();

  private generateClasses() {
    return hlm(cardContentVariants({ variant: this._variant }), this._inputs);
  }
}
