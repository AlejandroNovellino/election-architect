import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ScheduleActivity } from '../../../../interfaces/schedule-activity.interface';

@Component({
  selector: 'activity-schedule-table',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, InputTextModule],
  templateUrl: './activity-schedule-table.component.html',
})
export class ActivityScheduleTableComponent {
  public currentActivities = input<ScheduleActivity[]>([]);

  public onEditActivity = output<ScheduleActivity>();
  public onDeleteActivity = output<ScheduleActivity>();

  onHandleEditActivity(currentActivity: ScheduleActivity) {
    this.onEditActivity.emit(currentActivity);
  }

  onHandleDeleteActivity(currentActivity: ScheduleActivity) {
    this.onDeleteActivity.emit(currentActivity);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
