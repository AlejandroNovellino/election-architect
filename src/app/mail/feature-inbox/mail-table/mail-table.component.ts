import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus, RequestType } from '@mail-app/data/enums/mail';
import { Mail } from '@mail-app/data/interfaces/mail';
import { MailService } from '@mail-app/data/services/mail.service';
import { MailReplyComponent } from '@mail-app/feature-response/mail-reply/mail-reply.component';
import { MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-mail-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    MenuModule,
    AvatarModule,
    DialogModule,
    InputTextModule,
    TagModule,
    MailReplyComponent,
    DropdownModule,
    ChipModule,
    SkeletonModule,
  ],
  templateUrl: './mail-table.component.html',
  styleUrl: './mail-table.component.scss',
})
export class MailTableComponent implements OnInit {
  // inputs
  @Input() mails!: Mail[];
  // injected services
  mailService: MailService = inject(MailService);
  // signals
  menuItems: WritableSignal<MenuItem[]> = signal([]);
  requestTypes: WritableSignal<any[]> = signal([]);
  statusTypes: WritableSignal<any[]> = signal([]);
  selectedMails: WritableSignal<Mail[]> = signal([]);
  requestTypeFilter: WritableSignal<string> = signal('');
  requestStatusFilter: WritableSignal<string> = signal('');
  // view child to the table
  @ViewChild(Table)
  tableReference!: Table;
  // variables
  mail: Mail = {};
  dialogVisible: boolean = false;

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    // set the menu items
    this.menuItems.set([
      {
        label: 'Archive',
        icon: 'pi pi-fw pi-file',
        command: () => this.onArchiveMultiple(),
      },
      {
        label: 'Spam',
        icon: 'pi pi-fw pi-ban',
        command: () => this.onSpamMultiple(),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => this.onDeleteMultiple(),
      },
    ]);
    // set the request types
    this.requestTypes.set([
      { label: RequestType.Candidature, value: RequestType.Candidature },
      { label: RequestType.Challenge, value: RequestType.Challenge },
      { label: RequestType.Complaint, value: RequestType.Complaint },
    ]);
    // set the status types
    this.statusTypes.set([
      { label: RequestStatus.Pending, value: RequestStatus.Pending },
      { label: RequestStatus.Rejected, value: RequestStatus.Rejected },
      { label: RequestStatus.Disapproved, value: RequestStatus.Disapproved },
      { label: RequestStatus.Approved, value: RequestStatus.Approved },
      { label: RequestStatus.Processing, value: RequestStatus.Processing },
    ]);
  }

  toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
    if (event.type === 'mouseenter') {
      opt.style.display = 'flex';
      date.style.display = 'none';
    } else {
      opt.style.display = 'none';
      date.style.display = 'flex';
    }
  }

  onRowSelect(id: number) {
    this.router.navigate(['/mail/detail/', id]);
  }

  onStar(event: Event, id: number) {
    event.stopPropagation();
    this.mailService.onStar(id);
  }

  onBookmark(event: Event, id: number) {
    event.stopPropagation();
    this.mailService.onBookmark(id);
  }

  onArchive(event: Event, id: number) {
    event.stopPropagation();
    this.mailService.onArchive(id);
    this.messageService.add({
      severity: 'info',
      summary: 'Archivado',
      detail: 'Correo archivado',
      life: 3000,
    });
  }

  onTrash(event: Event, id: number) {
    event.stopPropagation();
    this.mailService.onDelete(id);
    this.messageService.add({
      severity: 'info',
      summary: 'Eliminado',
      detail: 'Correo eliminado',
      life: 3000,
    });
  }

  onReply(event: Event, mail: Mail) {
    event.stopPropagation();
    this.mail = mail;
    this.dialogVisible = true;
  }

  onDelete(id: number) {}

  onDeleteMultiple() {
    if (this.selectedMails() && this.selectedMails().length > 0) {
      this.mailService.onDeleteMultiple(this.selectedMails());
      this.messageService.add({
        severity: 'info',
        summary: 'Eliminados',
        detail: 'Correos eliminados',
        life: 3000,
      });
    }
  }

  onSpamMultiple() {
    if (this.selectedMails() && this.selectedMails().length > 0) {
      this.mailService.onSpamMultiple(this.selectedMails());
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Correos movidos a spam',
        life: 3000,
      });
    }
  }

  onArchiveMultiple() {
    if (this.selectedMails() && this.selectedMails().length > 0) {
      this.mailService.onArchiveMultiple(this.selectedMails());
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Correos archivados',
        life: 3000,
      });
    }
  }

  onGlobalFilter(event: Event): void {
    this.tableReference.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  onRequestTypeFilter(value: any): void {
    this.tableReference.filter(value, 'requestType', 'equals');
  }

  onRequestStatusFilter(value: any): void {
    this.tableReference.filter(value, 'requestStatus', 'equals');
  }

  clearFilters(): void {
    this.tableReference.reset();
  }
}
