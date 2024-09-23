import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { GeneralDraftInfo } from '../../../interfaces/draft-events.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'delete-drafts-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonModule],
  templateUrl: './delete-drafts-dialog.component.html',
  styles: ``,
})
export class DeleteDraftsDialogComponent {
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
