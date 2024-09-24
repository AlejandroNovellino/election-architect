import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { RequestStatusEnum, RequestTypeEnum } from './../enums';
import { Mail } from '@mail-app/data/interfaces/mail';
import {
  PossibleResponses,
  PossibleTemplatesResponses,
} from '@mail-app/data/interfaces/mailResponse';
import { possibleResponses } from '@mail-app/data/responseTemplates/possible-responses';
import { responseTemplates } from '@mail-app/data/responseTemplates/response-templates';
import { MailService } from './mail.service';

@Injectable({
  providedIn: 'root',
})
export class ReplyToMessageService {
  // injected services
  mailService: MailService = inject(MailService);
  possibleResponsesToRequest: WritableSignal<PossibleResponses> =
    signal(possibleResponses);
  responseTemplatesToRequest: WritableSignal<PossibleTemplatesResponses> =
    signal(responseTemplates);

  constructor() {}

  onSend(mail: Mail) {
    // generate a new id, put a title if untitled and generate the new Date
    if (!mail.id) {
      mail.id = this.generateId();
    }
    if (!mail.title) {
      mail.title = 'Untitled';
    }
    mail.date = this.generateDate();
    // update the service that store the mails
    this.mailService.addNewMail(mail);
  }

  forwardMessage(mailToForward: Mail): Mail {
    // create the body of the message to forward
    let forwardMail: Mail = {};
    // set the message
    forwardMail.message = `
    ---------- Forwarded message ----------</br>
    From: ${mailToForward.from}</br>
    Date: ${new Date().toDateString()}</br>
    Subject: ${mailToForward.title}</br>
    To: ${mailToForward.to}</br>
    </br></br>
    ${mailToForward.message}
    `;

    // TODO THIS SHOULD BE THE LOGGED IN USER
    forwardMail.from = 'User now in system';
    forwardMail.to = mailToForward.from;
    forwardMail.image = 'assets/layout/images/avatar.png';
    // set the other mail values
    forwardMail.title = mailToForward.title;
    forwardMail.date = Date.toString();
    forwardMail.important = false;
    forwardMail.starred = false;
    forwardMail.trash = false;
    forwardMail.spam = false;
    forwardMail.archived = false;
    forwardMail.sent = true;
    forwardMail.read = false;

    return forwardMail;
  }

  getPossibleRequestResponses(
    requestStatus: keyof typeof RequestStatusEnum | undefined
  ): (keyof typeof RequestStatusEnum)[] {
    if (requestStatus) {
      // get the request response based on the type of the request and the status
      return possibleResponses[requestStatus];
    } else {
      return [];
    }
  }

  getResponseTemplate(
    requestType: keyof typeof RequestTypeEnum | undefined,
    selectedResponse: keyof typeof RequestStatusEnum | undefined,
    name: string
  ): string {
    if (requestType && selectedResponse) {
      // get the request response based on the type of the request and the status
      return responseTemplates[requestType][selectedResponse](name);
    } else {
      return '';
    }
  }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateDate() {
    return new Date().toDateString().split(' ').slice(1, 4).join(' ');
  }
}
