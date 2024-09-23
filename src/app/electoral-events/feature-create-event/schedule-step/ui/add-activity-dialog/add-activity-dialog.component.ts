import {
  Component,
  effect,
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
  selector: 'add-activity-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    InputNumberModule,
    CalendarModule,
    DialogModule,
  ],
  templateUrl: './add-activity-dialog.component.html',
})
export class AddActivityDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private getAllActivitiesService = inject(GetAllActivitiesService);
  private getAllResponsiblesService = inject(GetAllResponsiblesService);

  public activities = signal<Activity[]>([]);
  public responsibles = signal<Responsible[]>([]);
  public activityForm!: FormGroup;

  public openDialog = input<boolean>();
  public minDate = input<Date>();
  public onCloseDialog = output<void>();
  public onSubmitForm = output<ScheduleActivity>();

  async setActivities() {
    this.activities.set(await this.getAllActivitiesService.execute());
  }

  async setResponsibles() {
    this.responsibles.set(await this.getAllResponsiblesService.execute());
  }

  onSumitActivityForm() {
    this.onSubmitForm.emit(this.activityForm.value);
    console.log(this.activityForm.value);
    this.onCloseActivityFormDialog();
    this.activityForm.reset();
  }

  onCloseActivityFormDialog() {
    this.onCloseDialog.emit();
  }

  initForm() {
    this.activityForm = this.fb.group({
      activity: ['', Validators.required],
      responsibles: ['', Validators.required],
      startingDate: ['', Validators.required],
      duration: ['', Validators.required],
    });
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
