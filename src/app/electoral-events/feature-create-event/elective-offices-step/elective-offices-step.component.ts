import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import {
  ElectiveOfficeByCoGoverment,
  CoGoverment,
} from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { AddElectiveOfficesForm } from './ui/add-elective-offices-form/add-elective-offices-form.component';
import { ElectiveOfficesSelectedComponent } from './ui/elective-offices-selected/elective-offices-selected.component';
import { ManageDraftCreationService } from '../data/manage-draft-creation.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'feature-create-event-elective-offices-step',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    ReactiveFormsModule,
    MultiSelectModule,
    AddElectiveOfficesForm,
    ElectiveOfficesSelectedComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './elective-offices-step.component.html',
  providers: [MessageService],
})
export default class ChargesStepComponent implements OnInit {
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private manageDraftCreationService = inject(ManageDraftCreationService);

  public restoreEntityOnForm = signal<CoGoverment | undefined>(undefined);
  public isLoading = signal<boolean>(false);

  private _currentSelection: ElectiveOfficeByCoGoverment[] = [];

  public setSelectedCharges({
    coGoverment: CoGoverment,
    electiveOffices,
  }: ElectiveOfficeByCoGoverment) {
    const chargesToAdd: ElectiveOfficeByCoGoverment = {
      coGoverment: CoGoverment,
      electiveOffices,
    };

    this._currentSelection.push(chargesToAdd);
    this.messageService.add({
      key: 'chargesAdded',
      severity: 'success',
      summary: 'Cargos agregados',
      detail: `Se han agregado ${electiveOffices.length} cargos a ${CoGoverment.name}`,
    });
  }

  get currentSelection(): ElectiveOfficeByCoGoverment[] {
    return this._currentSelection;
  }

  removeCharges(charge: ElectiveOfficeByCoGoverment) {
    const CoGoverment = charge.coGoverment;
    this._currentSelection = this._currentSelection.filter(
      (selection) => selection.coGoverment.id !== CoGoverment.id
    );
    this.messageService.add({
      key: 'chargesRemoved',
      severity: 'info',
      summary: 'Cargos eliminados',
      detail: `Se han eliminado los cargos de ${CoGoverment.name}`,
    });

    this.restoreEntityOnForm.set({ ...CoGoverment });
  }

  async submitCharges() {
    try {
      this.isLoading.set(true);
      const resp = await this.manageDraftCreationService.submitElectiveOffices(
        this._currentSelection.flatMap((current) =>
          current.electiveOffices.map((eo) => eo.id)
        )
      );

      if (!resp) {
        this.emitErrorToastSavingElectiveOffices();
        return;
      }
      this.router.navigateByUrl('electoral-events/create-draft/schedule');
    } catch (error) {
      console.log(error);
      this.emitErrorToastSavingElectiveOffices();
    } finally {
      this.isLoading.set(false);
    }
  }

  private emitErrorToastSavingElectiveOffices(): void {
    this.messageService.add({
      key: 'errorStartingDraft',
      severity: 'danger',
      summary: 'Error',
      detail: `Se produjo un error salvando la configuración inicial del draft.`,
    });
  }

  goBack() {
    this.router.navigateByUrl('electoral-events/create-draft/info');
  }

  ngOnInit(): void {}
}
