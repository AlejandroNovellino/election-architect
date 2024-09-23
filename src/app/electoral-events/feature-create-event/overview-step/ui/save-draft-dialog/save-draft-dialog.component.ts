import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'overview-save-draft-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './save-draft-dialog.component.html',
})
export class SaveDraftDialogComponent {
  public saveConfig: boolean = false;

  isDialogVisible = input<boolean>(false);

  onCancel = output<void>();
  onSubmit = output<boolean>();

  HandleCancel() {
    console.log(this.saveConfig);
    this.onCancel.emit();
    this.saveConfig = false;
    console.log(this.saveConfig);
  }

  HandleSubmit() {
    this.onSubmit.emit(this.saveConfig);
  }
}
