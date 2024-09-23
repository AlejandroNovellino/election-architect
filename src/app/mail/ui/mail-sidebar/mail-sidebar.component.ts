import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RequestType } from '@mail-app/data/enums/mail';
import { Mail } from '@mail-app/data/interfaces/mail';
import { MailService } from '@mail-app/data/services/mail.service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-mail-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './mail-sidebar.component.html',
})
export class MailSidebarComponent implements OnDestroy {
  // services injected
  private mailService = inject(MailService);

  // variables
  mainItems = computed<MenuItem[]>(() => {
    let badgeValues = this.mailService.mailBadgeValues();

    return [
      {
        label: 'Buzón',
        icon: 'pi pi-inbox',
        badge: badgeValues.inbox,
        routerLink: '/mail/inbox',
      },
      {
        label: 'Candidaturas',
        icon: 'pi pi-file-arrow-up',
        badge: badgeValues.candidatures,
        routerLink: '/mail/candidature',
      },
      {
        label: 'Impugnaciones',
        icon: 'pi pi-exclamation-circle',
        badge: badgeValues.challenges,
        routerLink: '/mail/challenge',
      },
      {
        label: 'Denuncias',
        icon: 'pi pi-exclamation-triangle',
        badge: badgeValues.complaints,
        routerLink: '/mail/complaint',
      },
    ];
  });

  subItems = computed<MenuItem[]>(() => {
    let badgeValues = this.mailService.mailBadgeValues();

    return [
      {
        label: 'Favoritos',
        icon: 'pi pi-star',
        badge: badgeValues.starred,
        routerLink: '/mail/starred',
      },
      {
        label: 'Spam',
        icon: 'pi pi-ban',
        badge: badgeValues.spam,
        routerLink: '/mail/spam',
      },
      {
        label: 'Importantes',
        icon: 'pi pi-bookmark',
        badge: badgeValues.important,
        routerLink: '/mail/important',
      },
      {
        label: 'Enviados',
        icon: 'pi pi-send',
        badge: '',
        routerLink: '/mail/sent',
      },
      {
        label: 'Archivados',
        icon: 'pi pi-book',
        badge: badgeValues.archived,
        routerLink: '/mail/archived',
      },
      {
        label: 'Basura',
        icon: 'pi pi-trash',
        badge: '',
        routerLink: '/mail/trash',
      },
    ];
  });

  routeSubscription: Subscription;

  url: string = '';

  showMoreOptions: Boolean = false;

  constructor(private router: Router) {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params: any) => {
        this.url = params.url;
      });
  }

  navigate(item: MenuItem) {
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    }
  }

  toggleMoreOptions() {
    this.showMoreOptions = !this.showMoreOptions;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
