import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mail } from '@mail-app/data/interfaces/mail';
import { MailService } from '@mail-app/data/services/mail.service';
import { ReplyToMessageService } from '@mail-app/data/services/reply-to-message.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-mail-reply',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
  ],
  providers: [MessageService],
  templateUrl: './mail-reply.component.html',
})
export class MailReplyComponent {
  // services injected
  replyToMailService: ReplyToMessageService = inject(ReplyToMessageService);
  // variables
  newMail: Mail = {
    id: '',
    to: '',
    email: '',
    image: '',
    title: '',
    message: '',
    date: '',
    important: false,
    starred: false,
    trash: false,
    spam: false,
    archived: false,
    sent: true,
  };

  displayMessage: boolean = false;

  @Input() content: Mail = {};

  @Output() hide: EventEmitter<any> = new EventEmitter();

  constructor(
    private messageService: MessageService,
    private mailService: MailService
  ) {}

  sendMail() {
    let { image, from, title } = this.content;
    this.newMail = { ...this.newMail, to: from, title: title, image: image };
    this.replyToMailService.onSend(this.newMail);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Mail sent',
    });
    this.hide.emit();
  }

  toggleMessage() {
    this.displayMessage = !this.displayMessage;
  }
}
