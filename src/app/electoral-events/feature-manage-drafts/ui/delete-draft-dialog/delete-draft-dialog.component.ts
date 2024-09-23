import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { GeneralDraftInfo } from '../../../interfaces/draft-events.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'delete-draft-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonModule],
  templateUrl: './delete-draft-dialog.component.html',
  styles: ``,
})
export class DeleteDraftDialogComponent {
  public draft = input<GeneralDraftInfo>();

  public isVisible = input<boolean>(false);

  public onCloseDialog = output<void>();
  public onConfirmDelete = output<void>();

  closeDialog() {
    this.onCloseDialog.emit();
  }

  confirmDelete() {
    this.onConfirmDelete.emit();
  }
}
