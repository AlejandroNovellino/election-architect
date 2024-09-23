import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  getFieldError,
  ngErrorClass,
} from '@shared/util-handler/errors.handler';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ElectoralActivityService } from './../../data/services';

@Component({
  selector: 'app-electoral-activities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    SkeletonModule,
  ],
  providers: [MessageService],
  templateUrl: './ElectoralActivities.component.html',
})
export default class ElectoralActivitiesComponent implements OnInit {
  // injectors
  electoralActivityService = inject(ElectoralActivityService);
  messageService = inject(MessageService);
  formBuilder = inject(FormBuilder);
  // view child to the table
  @ViewChild(Table)
  tableReference!: Table;
  // signals
  dialogVisible = signal<boolean>(false);
  // form
  newPopulationTypeForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required]],
  });

  toggleDialog(): void {
    // toggle the dialog
    this.dialogVisible.update((value) => !value);
    // reset the form
    this.newPopulationTypeForm.reset();
  }

  onCreateNewPopulation(): void {
    // verify if the form is valid
    if (this.newPopulationTypeForm.valid) {
      // add the new population type
      this.electoralActivityService.addNewElectoralActivity(
        this.newPopulationTypeForm.controls['name'].value,
        this.newPopulationTypeForm.controls['description'].value
      );
      // set the message on the toast
      this.messageService.add({
        severity: 'success',
        summary: 'Creación exitosa',
        detail: 'Actividad electoral creada con éxito',
      });
      // toggle the dialog
      this.toggleDialog();
    } else {
      // mark all as touched to show the requirements
      this.newPopulationTypeForm.markAllAsTouched();
    }
  }

  onGlobalFilter(event: Event): void {
    this.tableReference.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  getFieldError(field: string): string | null {
    return getFieldError(this.newPopulationTypeForm, field);
  }

  ngErrorClass(field: string): string {
    return ngErrorClass(this.newPopulationTypeForm, field);
  }

  ngOnInit(): void {
    // update the data of the service
    this.electoralActivityService.getData();
  }
}
