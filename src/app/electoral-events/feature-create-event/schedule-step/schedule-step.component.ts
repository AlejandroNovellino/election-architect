import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { ReactiveFormsModule } from '@angular/forms';
import { AddActivityDialogComponent } from './ui/add-activity-dialog/add-activity-dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { CalendarComponent } from './ui/calendar/calendar.component';
import { ActivityScheduleTableComponent } from './ui/activity-schedule-table/activity-schedule-table.component';
import { DeleteActivityDialogComponent } from './ui/delete-activity-dialog/delete-activity-dialog.component';
import { EditActivityDialogComponent } from './ui/edit-activity-dialog/edit-activity-dialog.component';
import { Router } from '@angular/router';
import { Activity } from '../../interfaces/activity.interface';
import { Responsible } from '../../interfaces/responsible.interface';
import { ScheduleActivity } from '../../interfaces/schedule-activity.interface';
import { CreateDraftService } from '../data/create-draft.service';
import { ManageDraftCreationService } from '../data/manage-draft-creation.service';
import { SetElectoralPhasesRequest } from '../data/requests-bodies-interfaces/set-electoral-phases-request.interface';

const FROM_MILISECONDS_TO_DAYS = 1000 * 60 * 60 * 24;

interface ScheduleActivityFormItem {
  activity: Activity;
  responsibles: Responsible[];
  startingDate: Date;
  duration: number;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    ToastModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    CommonModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    AddActivityDialogComponent,
    CalendarComponent,
    ActivityScheduleTableComponent,
    DeleteActivityDialogComponent,
    EditActivityDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: './schedule-step.component.html',
})
export default class ScheduleStepComponent implements OnInit {
  public currentDate = new Date();

  private createDraftService: CreateDraftService = inject(CreateDraftService);
  private manageDraftCreationService = inject(ManageDraftCreationService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  private _currentSchedule: ScheduleActivity[] = [];

  public openDialog = signal<boolean>(false);
  public openEditDialog = signal<boolean>(false);
  public isDeleteActivityDialogOpen = signal<boolean>(false);
  public activitySelectedForDelete = signal<ScheduleActivity | undefined>(
    undefined
  );
  public activityToEdit = signal<ScheduleActivity | undefined>(undefined);

  public currentActivities = signal<ScheduleActivity[]>(this._currentSchedule);

  get startingDate(): Date {
    if (this._currentSchedule[0]) return this._currentSchedule[0].startingDate;
    return new Date();
  }

  onOpenDialog() {
    this.openDialog.set(true);
  }

  closeDialog() {
    this.openDialog.set(false);
  }

  addNewActivityToSchedule($event: ScheduleActivityFormItem) {
    const newScheduleActivity: ScheduleActivity = {
      id: uuidv4(),
      activity: $event.activity,
      responsibles: $event.responsibles,
      startingDate: $event.startingDate,
      duration: $event.duration,
      endingDate: new Date(
        $event.startingDate.getTime() +
          $event.duration * FROM_MILISECONDS_TO_DAYS
      ),
    };
    this._currentSchedule = [...this._currentSchedule, newScheduleActivity];
    this.currentActivities.update(() => this._currentSchedule);
    this.messageService.add({
      key: 'activityAdded',
      severity: 'success',
      summary: 'Actividad agregada',
      detail: `${newScheduleActivity.activity.name} se agregó al cronograma`,
    });
  }

  openDeleteActivityDialog(currentActivity: ScheduleActivity) {
    this.isDeleteActivityDialogOpen.set(true);
    this.activitySelectedForDelete.set({ ...currentActivity });
  }

  onEditActivity(activity: ScheduleActivity) {
    this.activityToEdit.set(activity);
    this.openEditDialog.set(true);
  }

  closeEditDialog() {
    this.openEditDialog.set(false);
    this.activityToEdit.set(undefined);
  }

  deleteActivityFromSchedule() {
    this._currentSchedule = this._currentSchedule.filter(
      (currentActivity) =>
        currentActivity.id !== this.activitySelectedForDelete()!.id
    );
    this.isDeleteActivityDialogOpen.set(false);
    this.messageService.add({
      key: 'activityDeleted',
      severity: 'info',
      summary: 'Actividad eliminada',
      detail: `${
        this.activitySelectedForDelete()!.activity.name
      } se eliminó del cronograma`,
    });
    this.activitySelectedForDelete.set(undefined);
    this.currentActivities.update(() => this._currentSchedule);
  }

  editActivityFromSchedule($event: ScheduleActivity) {
    this._currentSchedule = this._currentSchedule.map((activity) => {
      if (activity.id === $event.id) {
        return this.newEditedActivity($event);
      }
      return activity;
    });
    this.currentActivities.update(() => this._currentSchedule);
    this.messageService.add({
      key: 'activityEdited',
      severity: 'success',
      summary: 'Actividad editada',
      detail: `${$event.activity.name} se editó correctamente`,
    });
    this.closeEditDialog();
  }

  private newEditedActivity(activity: ScheduleActivity) {
    return {
      ...activity,
      endingDate: new Date(
        activity.startingDate.getTime() +
          activity.duration * FROM_MILISECONDS_TO_DAYS
      ),
    };
  }

  cancelDeteteActivity() {
    this.isDeleteActivityDialogOpen.set(false);
    this.activitySelectedForDelete.set(undefined);
  }

  goBack() {
    this.router.navigateByUrl('electoral-events/create-draft/charges');
  }

  submitSchedule() {
    const setElectoralPhasesRequest: SetElectoralPhasesRequest[] =
      this._currentSchedule.map((ElectoralActivity) => ({
        activityId: ElectoralActivity.activity.id,
        responsiblesId: ElectoralActivity.responsibles.map(
          (responsible) => responsible.id
        ),
        startingDate: ElectoralActivity.startingDate,
        endingDate: ElectoralActivity.endingDate,
      }));
    console.log({ setElectoralPhasesRequest });

    this.manageDraftCreationService.submitElectoralPhases(
      setElectoralPhasesRequest
    );
    this.router.navigateByUrl('electoral-events/create-draft/overview');
  }

  ngOnInit(): void {
    this._currentSchedule = this.createDraftService.currentActivities;
    this.currentActivities.set(this._currentSchedule);
  }
}
