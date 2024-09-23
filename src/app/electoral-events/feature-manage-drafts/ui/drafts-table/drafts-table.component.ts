import { CommonModule } from '@angular/common';
import { Component, input, signal, output, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { GeneralDraftInfo } from '../../../interfaces/draft-events.interface';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'drafts-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, InputTextModule],
  templateUrl: './drafts-table.component.html',
  styles: ``,
})
export class DraftsTableComponent {
  public draftEvents = input<GeneralDraftInfo[]>();
  public selectedDrafts = signal<GeneralDraftInfo[]>([]);
  public router: Router = inject(Router);

  public onDeleteSelectedDrafts = output<GeneralDraftInfo[]>();

  public onDeleteDraft = output<GeneralDraftInfo>();

  deleteDraft(draft: GeneralDraftInfo) {
    this.onDeleteDraft.emit(draft);
  }

  deleteDrafts() {
    this.onDeleteSelectedDrafts.emit(this.selectedDrafts());
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  navigateTo(path: string) {
    this.router.navigate([`electoral-events/${path}`]);
  }
}
