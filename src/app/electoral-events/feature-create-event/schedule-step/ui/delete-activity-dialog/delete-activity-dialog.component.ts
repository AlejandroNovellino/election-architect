import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScheduleActivity } from '../../../../interfaces/schedule-activity.interface';

@Component({
  selector: 'delete-activity-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './delete-activity-dialog.component.html',
})
export class DeleteActivityDialogComponent {
  isDialogVisible = input<boolean>(false);
  activitityForDeletion = input<ScheduleActivity>();

  onCancelDeletion = output<void>();
  onSubmitDeletion = output<void>();

  onHandleCancelDeletion() {
    this.onCancelDeletion.emit();
  }

  onHandleSubmitDeletion() {
    this.onSubmitDeletion.emit();
  }
}
