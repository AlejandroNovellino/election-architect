import { CommonModule, Location } from '@angular/common';
import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from '@mail-app/data/enums/mail';
import { Mail } from '@mail-app/data/interfaces/mail';
import { MailService } from '@mail-app/data/services/mail.service';
import { ReplyToMessageService } from '@mail-app/data/services/reply-to-message.service';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-mail-detail',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    FormsModule,
    ButtonModule,
    EditorModule,
    AvatarModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './mail-detail.component.html',
})
export default class MailDetailComponent implements OnInit {
  // services injected
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);
  private router = inject(Router);

  mailService: MailService = inject(MailService);
  replyToMailService: ReplyToMessageService = inject(ReplyToMessageService);
  messageService: MessageService = inject(MessageService);
  // signals
  reply: WritableSignal<boolean> = signal(false);
  mail = computed(() => {
    let id = this.activatedRoute.snapshot.params['id'];
    return this.mailService.getMailById(id);
  });
  possibleResponsesMenuItems: WritableSignal<(keyof typeof RequestStatus)[]> =
    signal([]);
  selectedTypeOfResponse = model<keyof typeof RequestStatus>();
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
    read: false,
  };

  id: any;

  constructor() {}

  goBack() {
    this.location.back();
  }

  setToReply() {
    // get the possible responds for the status of the request and the type
    // set reply to true to see the possible responds
    this.reply.set(true);
  }

  setToForward() {
    // set the body of the new mail
    this.newMail = this.replyToMailService.forwardMessage(this.mail());
    // set reply to true to see the new message
    this.reply.set(true);
  }

  cancelMessage() {
    // hide the reply elements
    this.reply.set(false);
    // delete the content of the new message
    this.newMail.message = '';
  }

  setResponseForStatus() {
    console.log(this.selectedTypeOfResponse());
  }

  getResponseTemplate(selectedResponse: keyof typeof RequestStatus) {
    let selectedTemplate = this.replyToMailService.getResponseTemplate(
      this.mail().requestType,
      selectedResponse,
      this.mail().from as string
    );

    this.newMail.message = selectedTemplate;
  }

  clearSelectedTemplate() {
    // clear the message template
    this.newMail.message = '';
  }

  sendMail() {
    if (this.newMail.message) {
      this.newMail.to = this.mail().from;
      this.newMail.from = 'User now in the system';
      this.newMail.image = 'assets/layout/images/avatar.png';

      this.replyToMailService.onSend(this.newMail);
      this.router.navigate(['/mail/inbox']);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Mail sent',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Cannot send a empty message',
      });
    }
  }

  private getResponseOptions(): (keyof typeof RequestStatus)[] {
    // return the menu items of the possible options
    return this.replyToMailService
      .getPossibleRequestResponses(this.mail().requestStatus)
      .map((element: keyof typeof RequestStatus) => {
        return element;
      });
  }

  ngOnInit() {
    this.possibleResponsesMenuItems.set(this.getResponseOptions());
    // update the mail to read
    this.mailService.onRead(this.mail().id);
  }
}
