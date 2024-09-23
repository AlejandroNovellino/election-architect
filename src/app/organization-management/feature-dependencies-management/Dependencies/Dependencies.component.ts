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
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Dependency } from './../../data/interfaces';
import { DependencyFacadeService } from './../data';

@Component({
  selector: 'app-dependencies',
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
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './Dependencies.component.html',
})
export default class DependenciesComponent implements OnInit {
  // injectors
  dependencyFacadeService = inject(DependencyFacadeService);
  messageService = inject(MessageService);
  formBuilder = inject(FormBuilder);
  // view child to the table
  @ViewChild(Table)
  tableReference!: Table;
  // signals
  dialogVisible = signal<boolean>(false);
  moreInfoVisible = signal<boolean>(false);
  dependencyToShowMoreInfo = signal<Dependency | null>(null);
  // form
  newDependencyForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dependencyType: ['', [Validators.required]],
    fatherDependency: ['', []],
  });

  toggleDialog(): void {
    // toggle the dialog
    this.dialogVisible.update((value) => !value);
    // reset the form
    this.newDependencyForm.reset();
  }

  toggleMoreInfo(): void {
    // toggle the dialog
    this.moreInfoVisible.update((value) => !value);
  }

  onShowMoreInfo(selectedDependency: Dependency): void {
    // set the selected dependency
    this.dependencyToShowMoreInfo.set(selectedDependency);
    // toggle the card to see the info
    this.toggleMoreInfo();
  }

  onCreateNewDependency(): void {
    // verify if the form is valid
    if (this.newDependencyForm.valid) {
      // add the new population type
      this.dependencyFacadeService.addNewDependency(
        this.newDependencyForm.controls['name'].value,
        this.newDependencyForm.controls['description'].value,
        this.newDependencyForm.controls['dependencyType'].value,
        this.newDependencyForm.controls['fatherDependency'].value
      );
      // set the message on the toast
      this.messageService.add({
        severity: 'success',
        summary: 'Creación exitosa',
        detail: 'Dependencia creada con éxito',
      });
      // toggle the dialog
      this.toggleDialog();
    } else {
      // mark all as touched to show the requirements
      this.newDependencyForm.markAllAsTouched();
    }
  }

  onGlobalFilter(event: Event): void {
    this.tableReference.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  getFieldError(field: string): string | null {
    return getFieldError(this.newDependencyForm, field);
  }

  ngErrorClass(field: string): string {
    return ngErrorClass(this.newDependencyForm, field);
  }

  ngOnInit(): void {
    // update the data of the service
    this.dependencyFacadeService.getData();
  }
}
