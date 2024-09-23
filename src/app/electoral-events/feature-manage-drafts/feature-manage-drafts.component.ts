import { Component, inject, OnInit, signal } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralDraftInfo } from '../interfaces/draft-events.interface';
import { GetAllDraftEventsService } from '../data/get-all-draft-events.service';
import { DraftsTableComponent } from './ui/drafts-table/drafts-table.component';
import { DeleteDraftDialogComponent } from './ui/delete-draft-dialog/delete-draft-dialog.component';
import { DeleteDraftsDialogComponent } from './ui/delete-drafts-dialog/delete-drafts-dialog.component';

@Component({
  selector: 'feature-manage-drafts',
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    DraftsTableComponent,
    DeleteDraftDialogComponent,
    DeleteDraftsDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: './feature-manage-drafts.component.html',
  styles: ``,
})
export default class FeatureManageDraftsComponent {
  public draftEvents = signal<GeneralDraftInfo[]>([]);

  public selectedEvents = signal<GeneralDraftInfo[]>([]);

  public deleteDialog: boolean = false;

  public deleteDraftsDialog: boolean = false;

  private getAllDraftService = inject(GetAllDraftEventsService);

  private messageService = inject(MessageService);

  private router = inject(Router);

  public draft = signal<GeneralDraftInfo | undefined>(undefined);

  ngOnInit(): void {
    this.draftEvents.set(this.getAllDraftService.execute());
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteSelectedDrafts(drafts: GeneralDraftInfo[]) {
    this.deleteDraftsDialog = true;
    this.selectedEvents.set(drafts);
  }

  deleteDraft(draft: GeneralDraftInfo) {
    this.deleteDialog = true;
    this.draft.set({ ...draft });
  }

  closeDialog() {
    this.deleteDialog = false;
    this.draft?.set(undefined);
  }

  closeDeleteDraftsDialog() {
    this.deleteDraftsDialog = false;
    this.selectedEvents?.set([]);
  }

  confirmDeleteSelected() {
    this.deleteDraftsDialog = false;

    this.draftEvents.update((currentEvents) =>
      currentEvents.filter((event) => !this.selectedEvents().includes(event))
    );

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Eventos Eliminados',
      life: 3000,
    });
    this.selectedEvents.set([]);
  }

  confirmDelete() {
    this.deleteDialog = false;
    this.draftEvents.update((currentEvents) =>
      currentEvents.filter((draft) => draft.id !== this.draft!()!.id)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Evento Eliminado',
      life: 3000,
    });
    this.draft?.set(undefined);
  }

  navigateTo(path: string) {
    this.router.navigate([`electoral-events/${path}`]);
  }
}
