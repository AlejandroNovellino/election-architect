import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import {
  ElectiveOffice,
  ElectiveOfficeByCoGoverment,
  CoGoverment,
} from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { GetAllCoGovermentsService } from '../../data/get-all-co-goverments.service';
import { GetAllElectiveOfficesByCoGovermentService } from '../../data/get-all-elective-offices-by-co-goverment.service';
import { GetElectiveOfficesByCoGovermentIdService } from '../../data/get-elective-offices-by-co-goverment-id.service';
import { filterElectiveOfficesByCoGovermentId } from '../../utils/filter-elective-offices-by-co-goverment-id.utils';
import {
  getFieldError,
  ngErrorClass,
} from '@shared/util-handler/errors.handler';

@Component({
  selector: 'add-elective-offices-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
  ],
  templateUrl: './add-elective-offices-form.component.html',
  styles: ``,
})
export class AddElectiveOfficesForm {
  constructor() {
    effect(
      () => {
        if (!this.entityRestored()) return;
        this.coGoverments.update((currentEntities) => {
          return [...currentEntities, this.entityRestored()!];
        });
      },
      { allowSignalWrites: true }
    );
  }

  private fb: FormBuilder = inject(FormBuilder);
  private getAllElectiveOfficesByCoGovermentService = inject(
    GetAllElectiveOfficesByCoGovermentService
  );
  private getAllCoGovermentsService = inject(GetAllCoGovermentsService);
  private getElectiveOfficesByCoGovermentIdService = inject(
    GetElectiveOfficesByCoGovermentIdService
  );
  public coGoverments = signal<CoGoverment[]>([]);
  public electiveOffices = signal<ElectiveOffice[]>([]);

  public electiveOfficesByCoGoverments = signal<ElectiveOfficeByCoGoverment[]>(
    []
  );

  public entityRestored = input<CoGoverment | undefined>();

  public onSubmitSelectedCharges = output<ElectiveOfficeByCoGoverment>();

  public electiveOfficesForm!: FormGroup;
  public chargeToAdd!: FormControl;

  private subscriptions: Subscription[] = [];

  submitSelectedCharges() {
    this.onSubmitSelectedCharges.emit(this.electiveOfficesForm.value);
    this.coGoverments.update((currentEntities) => {
      return currentEntities.filter(
        (coGoverment) =>
          coGoverment.id !== this.electiveOfficesForm.value.coGoverment.id
      );
    });
    this.electiveOffices.set([]);
    this.electiveOfficesForm.reset();
  }

  clearCharges() {
    this.electiveOffices.set([]);
    this.electiveOfficesForm.get('electiveOffices')!.reset();
  }

  async initForm() {
    this.electiveOfficesForm = this.fb.group({
      coGoverment: this.fb.control('', Validators.required),
      electiveOffices: this.fb.control([], Validators.required),
    });
    this.coGoverments.set(await this.getCoGoverments());
    this.electiveOfficesByCoGoverments.set(
      await this.getAllElectiveOfficesByCoGovermentService.execute()
    );

    this.chargeToAdd = this.fb.control('', Validators.required);
  }

  async handleValueChanges() {
    this.subscriptions.push(
      this.electiveOfficesForm
        .get('coGoverment')!
        .valueChanges.subscribe(async (coGoverment: CoGoverment) => {
          if (!coGoverment) return;
          this.electiveOffices.set(
            filterElectiveOfficesByCoGovermentId(
              this.electiveOfficesByCoGoverments(),
              coGoverment.id
            )
          );
          this.electiveOfficesForm.get('electiveOffices')!.reset();
        })
    );
  }

  async getCoGoverments(): Promise<CoGoverment[]> {
    const coGoverments = await this.getAllCoGovermentsService.execute();

    if (!coGoverments) return [];
    return coGoverments;
  }

  async getChargesByEntity(id: string): Promise<ElectiveOffice[]> {
    return await this.getElectiveOfficesByCoGovermentIdService.execute(id);
  }

  ngOnInit(): void {
    this.initForm();
    this.handleValueChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getFieldError(field: string): string | null {
    return getFieldError(this.electiveOfficesForm, field);
  }

  ngErrorClass(field: string): string {
    return ngErrorClass(this.electiveOfficesForm, field);
  }
}
