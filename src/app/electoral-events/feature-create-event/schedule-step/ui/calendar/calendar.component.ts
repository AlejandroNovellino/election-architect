import {
  Component,
  effect,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleActivity } from '../../../../interfaces/schedule-activity.interface';
import { ActivityInfoDialogComponent } from './ui/activity-info-dialog/activity-info-dialog.component';

function generateColor(): string {
  return '#xxxxxx'.replace(/x/g, (y) =>
    ((Math.random() * 16) | 0).toString(16)
  );
}

@Component({
  selector: 'schedule-calendar',
  standalone: true,
  imports: [FullCalendarModule, CalendarModule, ActivityInfoDialogComponent],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  public calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    displayEventTime: false,
    selectable: true,
    editable: true,
    eventClick: (e: any) => this.activitySelected(e),
  };

  public showInfoDialog = signal<boolean>(false);
  public acitivityToShow = signal<ScheduleActivity | undefined>(undefined);

  activitySelected(e: any) {
    let plainEvent = e.event.toPlainObject({
      collapseExtendedProps: true,
      collapseColor: true,
    });
    console.log({ plainEvent });
    this.acitivityToShow.set(plainEvent.scheduleActivity);
    this.showInfoDialog.set(true);
  }

  constructor() {
    effect(() => {
      this.updateCalendar(this.activities() || []);
    });
  }

  public activities = input<ScheduleActivity[]>();

  ngOnInit(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.activities()?.map((activity) => {
        const color = generateColor();
        return {
          title: activity.activity.name,
          start: activity.startingDate,
          end: activity.endingDate,
          backgroundColor: color,
          borderColor: color,
          scheduleActivity: activity,
        };
      }),
    };
  }

  updateCalendar(activities: ScheduleActivity[]): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: activities.map((activity) => {
        const color = generateColor();
        return {
          title: activity.activity.name,
          start: activity.startingDate,
          end: activity.endingDate,
          backgroundColor: color,
          borderColor: color,
          scheduleActivity: activity,
        };
      }),
    };
  }

  closeInfoDialog() {
    this.showInfoDialog.set(false);
  }
}
