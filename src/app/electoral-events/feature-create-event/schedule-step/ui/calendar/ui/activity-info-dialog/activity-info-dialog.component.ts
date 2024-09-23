import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ScheduleActivity } from '../../../../../../interfaces/schedule-activity.interface';

@Component({
  selector: 'activity-info-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, CalendarModule],
  templateUrl: './activity-info-dialog.component.html',
  styles: ``,
})
export class ActivityInfoDialogComponent {
  public showDialog = input<boolean>(false);
  public view: string = '';
  public scheduleActivity = input<ScheduleActivity>();

  public onCloseDialog = output<void>();

  closeDialog() {
    this.onCloseDialog.emit();
  }
}
