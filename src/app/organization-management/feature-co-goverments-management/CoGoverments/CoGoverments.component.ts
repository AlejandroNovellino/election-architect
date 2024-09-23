import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { CoGovermentService } from '../../data/services';

@Component({
  selector: 'app-co-goverments',
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
    SkeletonModule,
    DropdownModule,
  ],
  templateUrl: './CoGoverments.component.html',
})
export default class CoGovermentsComponent {
  // injectors
  coGovermentService = inject(CoGovermentService);
  messageService = inject(MessageService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  // view child to the table
  @ViewChild(Table)
  tableReference!: Table;
  // signals
  dialogVisible = signal<boolean>(false);
  coGovermentToShowMoreInfo = signal<CoGoverment | null>(null);

  navigateToNewCoGoverment() {
    // navigate to the view for creating the new co goverment
    this.router.navigate(['/co-goverments/new'], {
      relativeTo: this.activatedRoute,
    });
  }

  onRowSelect(id: string) {
    this.router.navigate(['/co-goverments/detail/', id], {
      relativeTo: this.activatedRoute,
    });
  }

  onGlobalFilter(event: Event): void {
    this.tableReference.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }
}
