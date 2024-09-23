import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GetAllElectionTypesService } from './data/get-all-election-types.service';
import { GeneralInfo } from '../../interfaces/general-info.interface';
import {
  getFieldError,
  ngErrorClass,
} from '@shared/util-handler/errors.handler';
import { ElectionType } from '../../interfaces/election-type.interface';
import { CreateDraftService } from '../data/create-draft.service';
import { StartDraftService } from './data/start-draft.service';
import { StartDraftDialogComponent } from './ui/start-draft-dialog/start-draft-dialog.component';
import { ManageDraftCreationService } from '../data/manage-draft-creation.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-details-step',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    StartDraftDialogComponent,
    ToastModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './details-step.component.html',
  styles: `
  .center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
`,
})
export default class DetailsStepComponent implements OnInit {
  public readonly currentDate = new Date();

  public electionTypes = signal<ElectionType[]>([]);
  public isVisible = signal<boolean>(false);

  public isLoading = signal<boolean>(false);

  private manageDraftCreationService = inject(ManageDraftCreationService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private messageService = inject(MessageService);

  private createDraftService = inject(CreateDraftService);

  private startDraftService = inject(StartDraftService);

  private getElectionTypesService = inject(GetAllElectionTypesService);

  public currentInfo = computed<GeneralInfo>(
    () => this.createDraftService.generalInfo
  );

  public detailsForm: FormGroup = this.fb.group({
    title: [
      this.currentInfo().title,
      [Validators.required, Validators.minLength(6)],
    ],
    description: [
      this.currentInfo().description,
      [Validators.required, Validators.minLength(10)],
    ],
    startingDate: [this.currentInfo().startingDate, [Validators.required]],
    electionType: [this.currentInfo().electionType, [Validators.required]],
  });

  onOpenDialog() {
    this.isVisible.set(true);
  }

  onCloseDialog() {
    this.isVisible.set(false);
  }

  onSubmit() {
    this.submitGeneralInfo();
    this.isVisible.set(false);
  }

  cancelCreation() {
    this.router.navigateByUrl('electoral-events');
  }

  getFieldError(field: string): string | null {
    return getFieldError(this.detailsForm, field);
  }

  public ngErrorClass(field: string): string {
    return ngErrorClass(this.detailsForm, field);
  }

  async setElectionTypes(): Promise<void> {
    this.electionTypes.set(await this.getElectionTypesService.execute());
  }

  ngOnInit() {
    this.setElectionTypes();
  }

  public async submitGeneralInfo(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.onCloseDialog();
      const generalInfo: GeneralInfo = this.getInfoFromForm();
      const response =
        await this.manageDraftCreationService.submitDraftBaseInfo(generalInfo);
      if (!response) {
        this.emitErrorToastSavingDraft();
        return;
      }
      this.router.navigateByUrl('electoral-events/create-draft/charges');
    } catch (error) {
      console.log(error);
      this.emitErrorToastSavingDraft();
    } finally {
      this.isLoading.set(false);
    }
  }

  private emitErrorToastSavingDraft(): void {
    this.messageService.add({
      key: 'errorStartingDraft',
      severity: 'danger',
      summary: 'Error',
      detail: `Se produjo un error salvando la configuración inicial del draft.`,
    });
  }

  private getInfoFromForm(): GeneralInfo {
    return {
      id: '',
      title: this.detailsForm.get('title')!.value!,
      description: this.detailsForm.get('description')!.value!,
      startingDate: this.detailsForm.get('startingDate')!.value!,
      electionType: this.detailsForm.get('electionType')!.value!,
    };
  }
}
