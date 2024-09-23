import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailReplyComponent } from '@mail-app/feature-response/mail-reply/mail-reply.component';
import { Mail } from '@mail-app/data/interfaces/mail';
import { MailService } from '@mail-app/data/services/mail.service';
import { MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-mail-sent-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    MenuModule,
    AvatarModule,
    DialogModule,
    InputTextModule,
    TagModule,
    MailReplyComponent,
  ],
  providers: [MessageService],
  templateUrl: './mail-sent-table.component.html',
})
export class MailSentTableComponent implements OnInit {
  // inputs
  @Input() mails!: Mail[];
  // injected services
  mailService: MailService = inject(MailService);
  // variables
  menuItems: MenuItem[] = [];
  selectedMails: Mail[] = [];
  mail: Mail = {};
  dialogVisible: boolean = false;

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.menuItems = [
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
    ];
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

  onArchive(event: Event, id: number) {
    event.stopPropagation();
    this.mailService.onArchive(id);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Mail archived',
      life: 3000,
    });
  }

  onBookmark(event: Event, id: number) {
    event.stopPropagation();
    this.mailService.onBookmark(id);
  }

  onDelete(id: number) {
    this.mailService.onDelete(id);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Mail deleted',
      life: 3000,
    });
  }

  onDeleteMultiple() {
    if (this.selectedMails && this.selectedMails.length > 0) {
      this.mailService.onDeleteMultiple(this.selectedMails);
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Mails deleted',
        life: 3000,
      });
    }
  }

  onSpamMultiple() {
    if (this.selectedMails && this.selectedMails.length > 0) {
      this.mailService.onSpamMultiple(this.selectedMails);
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Moved to spam',
        life: 3000,
      });
    }
  }

  onArchiveMultiple() {
    if (this.selectedMails && this.selectedMails.length > 0) {
      this.mailService.onArchiveMultiple(this.selectedMails);
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Moved to archive',
        life: 3000,
      });
    }
  }

  onTrash(event: Event, mail: Mail) {
    event.stopPropagation();
    if (mail.trash) {
      this.onDelete(mail.id);
    }
    this.mailService.onTrash(mail.id);
  }

  onReply(event: Event, mail: Mail) {
    event.stopPropagation();
    this.mail = mail;
    this.dialogVisible = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
