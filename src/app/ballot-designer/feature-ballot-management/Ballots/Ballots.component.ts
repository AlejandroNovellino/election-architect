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

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { BallotService } from '../../data/services';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-ballots',
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
  templateUrl: './Ballots.component.html',
  styleUrl: './Ballots.component.scss',
})
export default class BallotsComponent implements OnInit {
  // injectors
  readonly ballotService = inject(BallotService);
  readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  // view child to the table
  @ViewChild(Table)
  tableReference!: Table;
  // signals
  dialogVisible = signal<boolean>(false);
  //coGovermentToShowMoreInfo = signal<CoGoverment | null>(null);

  navigateToNewBallot() {
    // TODO change
    // navigate to the view for creating the new co goverment
    this.router.navigate(['/ballot-designer/new'], {
      relativeTo: this.activatedRoute,
    });
  }

  onRowSelect(id: string) {
    // TODO change
    this.router.navigate(['/ballot-designer/detail/', id], {
      relativeTo: this.activatedRoute,
    });
  }

  onGlobalFilter(event: Event): void {
    this.tableReference.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  ngOnInit(): void {
    // update the data of the service
    this.ballotService.getData();
  }
}
