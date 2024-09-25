import { Component, computed, inject } from '@angular/core';
import { MailService } from '@mail-app/data/services/mail.service';
import { AppMenuitemComponent } from '../menuitem/menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitemComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  // injected services
  mailService: MailService = inject(MailService);
  // signals
  menuItems = computed(() => {
    return [
      {
        label: 'Eventos Electorales',
        icon: 'pi pi-box',
        routerLink: 'electoral-events',
      },
      {
        label: 'Tipos de Población',
        icon: 'pi pi-users',
        routerLink: 'population',
      },
      {
        label: 'Dependencias',
        icon: 'pi pi-sitemap',
        routerLink: 'dependency',
      },
      { label: 'Cargos', icon: 'pi pi-user-plus', routerLink: 'office' },
      {
        label: 'Tipos de Co-Gobierno',
        icon: 'pi pi-check-circle',
        routerLink: '/co-goverments/types',
      },
      {
        label: 'Co-Gobiernos',
        icon: 'pi pi-flag',
        routerLink: 'co-goverments',
      },
      {
        label: 'Actividades Electorales',
        icon: 'pi pi-book',
        routerLink: 'electoral-activities',
      },
      {
        label: 'Responsables',
        icon: 'pi pi-user-plus',
        routerLink: 'activities-responsables',
      },
      {
        label: 'Tarjetón Electoral',
        icon: 'pi pi-id-card',
        routerLink: 'ballot-designer',
      },
      {
        label: 'Mensajería',
        icon: 'pi pi-inbox',
        routerLink: '/mail/inbox',
        badge: this.mailService.amountOfNewMails(),
      },
    ];
  });

  constructor() {}
}
