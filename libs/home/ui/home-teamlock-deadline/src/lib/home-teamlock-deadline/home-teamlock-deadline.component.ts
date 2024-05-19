import {
  Component,
  computed,
  Input,
  signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { Race } from '@f1-predictions/models';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];
@Component({
  selector: 'teamlock-deadline',
  standalone: true,
  imports: [CommonModule, CountdownComponent],
  templateUrl: './home-teamlock-deadline.component.html',
  styleUrls: ['./home-teamlock-deadline.component.css'],
})
export class HomeTeamlockDeadlineComponent {
  @Input({ required: true }) race!: Race | undefined;

  active_race = signal({ quali_time: '' });
  countDown: Signal<CountdownConfig> = computed(() => {
    let targetDate;
    if (this.active_race()) {
      targetDate = new Date(this.active_race()!.quali_time);
    } else {
      const currentDate = new Date();
      const threeDaysFromNow = new Date(currentDate);
      threeDaysFromNow.setDate(currentDate.getDate() + 3);
      targetDate = threeDaysFromNow;
    }

    return {
      leftTime: Math.max(
        0,
        Math.floor((targetDate.getTime() - new Date().getTime()) / 1000)
      ),
      format: 'DD HH:mm:ss',
      formatDate: ({ date, formatStr }: any) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(
              new RegExp(`${name}+`, 'g'),
              (match: string) => {
                // When days is empty
                if (name === 'D' && v <= 0) {
                  return '';
                }
                return v.toString().padStart(match.length, '0');
              }
            );
          }
          return current;
        }, formatStr);
      },
      prettyText: (text: string) => {
        const splitDaysandTime = text.split(' ');
        const splitTime = splitDaysandTime[1].split(':');
        return `<div class="flex gap-2 w-full">
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#BF28C5] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute text-xs text-white font-lemonada font-medium"
              >${splitDaysandTime[0]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white -mt-1">Days</p>
        </div> 
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#BF28C5] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute text-xs text-white font-lemonada font-medium"
              >${splitTime[0]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white -mt-1">Hrs</p>
        </div>
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#BF28C5] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute text-xs text-white font-lemonada font-medium"
              >${splitTime[1]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white -mt-1">Mins</p>
        </div>
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#BF28C5] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute text-xs text-white font-lemonada font-medium"
              >${splitTime[2]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white -mt-1">Secs</p>
        </div>
      </div>`;
      },
    };
  });
  ngOnChanges(changes: SimpleChanges) {
    if (changes['race']) {
      this.active_race.set(changes['race'].currentValue);
    }
  }
}
