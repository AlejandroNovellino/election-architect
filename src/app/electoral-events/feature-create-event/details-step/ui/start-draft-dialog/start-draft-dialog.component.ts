import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'details-start-draft-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './start-draft-dialog.component.html',
})
export class StartDraftDialogComponent {
  isDialogVisible = input<boolean>(false);

  onCancel = output<void>();
  onSubmit = output<void>();

  HandleCancel() {
    this.onCancel.emit();
  }

  HandleSubmit() {
    this.onSubmit.emit();
  }
}
