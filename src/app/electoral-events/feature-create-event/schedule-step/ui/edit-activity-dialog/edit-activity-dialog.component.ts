import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { Activity } from '../../../../interfaces/activity.interface';
import { Responsible } from '../../../../interfaces/responsible.interface';
import { ScheduleActivity } from '../../../../interfaces/schedule-activity.interface';
import {
  getFieldError,
  ngErrorClass,
} from '@shared/util-handler/errors.handler';
import { MultiSelectModule } from 'primeng/multiselect';
import { ResponsiblesService } from '@electoral-events/feature-create-event/elective-offices-step/data/responsibles.service';
import { GetAllActivitiesService } from '../../data/get-all-activities.service';
import { GetAllResponsiblesService } from '../../data/get-all-responsibles.service';

@Component({
  selector: 'edit-activity-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    MultiSelectModule,
  ],
  templateUrl: './edit-activity-dialog.component.html',
})
export class EditActivityDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private readonly getAllActivitiesService = inject(GetAllActivitiesService);
  private readonly getAllResponsiblesService = inject(
    GetAllResponsiblesService
  );

  public activities = signal<Activity[]>([]);
  public responsibles = signal<Responsible[]>([]);
  public activityForm!: FormGroup;

  public openDialog = input<boolean>();
  public activityToEdit = input<ScheduleActivity | undefined>();
  public minDate = input<Date>();
  public onCloseDialog = output<void>();
  public onSubmitForm = output<ScheduleActivity>();

  async setActivities() {
    this.activities.set(await this.getAllActivitiesService.execute());
  }

  async setResponsibles() {
    this.responsibles.set(await this.getAllResponsiblesService.execute());
  }

  initForm() {
    this.activityForm = this.fb.group({
      id: [this.activityToEdit()?.id, Validators.required],
      activity: [this.activityToEdit()?.activity, Validators.required],
      responsibles: [this.activityToEdit()?.responsibles, Validators.required],
      startingDate: [this.activityToEdit()?.startingDate, Validators.required],
      duration: [this.activityToEdit()?.duration, Validators.required],
    });
  }

  onSumitActivityForm() {
    this.onSubmitForm.emit(this.activityForm.value);
    this.onCloseActivityFormDialog();
    this.activityForm.reset();
  }

  onCloseActivityFormDialog() {
    this.onCloseDialog.emit();
  }

  ngOnInit(): void {
    this.setActivities();
    this.setResponsibles();
    this.initForm();
  }

  getFieldError(field: string): string | null {
    return getFieldError(this.activityForm, field);
  }

  public ngErrorClass(field: string): string {
    return ngErrorClass(this.activityForm, field);
  }
}
