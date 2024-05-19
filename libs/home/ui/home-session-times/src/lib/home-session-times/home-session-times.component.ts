import {
  Component,
  computed,
  Input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Race } from '@f1-predictions/models';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'home-session-times',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './home-session-times.component.html',
  styleUrls: ['./home-session-times.component.css'],
})
export class HomeSessionTimesComponent {
  @Input({ required: true }) race!: Race | undefined;

  active_race = signal<Race>({} as Race);
  dates = computed(() => {
    const dates = [];
    if (this.active_race()) {
      for (let key in this.active_race()) {
        if (this.isDateValid(this.active_race()![key])) {
          dates.push({
            session: key.split('_')[0],
            session_time: this.active_race()![key] as Date,
          });
        }
      }
    }
    return dates;
  });
  isDateValid(dateString: string | Date | boolean): boolean {
    if (
      typeof dateString === 'string' &&
      dateString.charAt(dateString.length - 1) === 'Z'
    ) {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    }
    return false;
  }
  ngOnInit() {
    console.log(this.race);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['race']) {
      this.active_race.set(changes['race'].currentValue);
    }
  }
}
