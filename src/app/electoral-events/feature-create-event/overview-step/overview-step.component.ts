import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ScheduleActivity } from '../../interfaces/schedule-activity.interface';
import { GeneralInfo } from '../../interfaces/general-info.interface';
import { CreateDraftService } from '../data/create-draft.service';
import { ElectiveOfficeByCoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SaveDraftDialogComponent } from './ui/save-draft-dialog/save-draft-dialog.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ManageDraftCreationService } from '../data/manage-draft-creation.service';
import { GetAllDraftInfoService } from './data/get-all-draft-info.service';
import { FullDraft } from '@electoral-events/interfaces/full-draft-interface';

@Component({
  selector: 'app-overview-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, SaveDraftDialogComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './overview-step.component.html',
  styles: ``,
})
export default class OverviewStepComponent {
  private createDraftService = inject(CreateDraftService);
  private manageDraftCreationService = inject(ManageDraftCreationService);
  private getAllDraftInfo = inject(GetAllDraftInfoService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  public today = new Date();

  private draftId = signal<string>('');
  private fullInfo = signal<FullDraft | undefined>(undefined);

  public saveDraftDialog = signal<boolean>(false);
  public schedule = signal<ScheduleActivity[]>([]);
  public chargesToVote = signal<ElectiveOfficeByCoGoverment[]>([]);
  public generalInfo = signal<GeneralInfo>({
    id: '',
    title: '',
    description: '',
    startingDate: undefined,
    electionType: undefined,
  });

  setSchedule() {
    this.schedule.set(this.fullInfo()!.schedule!);
  }

  setChargesToVote() {
    this.chargesToVote.set(this.fullInfo()!.chargesToVote!);
  }

  setGeneralInfo() {
    this.generalInfo.set({
      id: this.fullInfo()!.id!,
      title: this.fullInfo()!.title!,
      description: this.fullInfo()!.description!,
      startingDate: this.fullInfo()!.startingDate!,
      electionType: this.fullInfo()!.electionType!,
    });
  }

  setId() {
    // this.draftId.set(this.manageDraftCreationService.id);
    this.draftId.set('ba25cf62-1272-4721-96b7-639d3472cf2e');
  }

  async setFullInfo() {
    this.fullInfo.set(await this.getAllDraftInfo.execute(this.draftId()));
  }

  goBack(): void {
    this.router.navigateByUrl('electoral-events/create-draft/schedule');
  }

  openSubmitDialog() {
    this.saveDraftDialog.set(true);
  }

  closeSaveDraftDialog() {
    this.saveDraftDialog.set(false);
  }

  submitDraft($event: boolean): void {
    this.createDraftService.saveDraft($event);
    this.saveDraftDialog.set(false);
    this.messageService.add({
      key: 'saveDraft',
      severity: 'success',
      summary: 'Draft guardado',
      detail: `Se ha guardado el draft exitosamente`,
    });
    this.router.navigateByUrl('electoral-events/');
  }

  async ngOnInit(): Promise<void> {
    this.setId();
    await this.setFullInfo();
    this.setSchedule();
    this.setChargesToVote();
    this.setGeneralInfo();
  }
}
