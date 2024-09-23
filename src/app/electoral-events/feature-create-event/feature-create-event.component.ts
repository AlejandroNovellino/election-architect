import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-feature-create-event',
  standalone: true,
  imports: [StepsModule],
  templateUrl: './feature-create-event.component.html',
  styles: `
  .create-event-display {
  margin-top: 5;
  width: 100%;
}
  `,
})
export default class FeatureCreateEventComponent {
  public routeItems = [
    { label: 'Detalles', routerLink: 'info' },
    { label: 'Cargos', routerLink: 'charges' },
    { label: 'Cronograma', routerLink: 'schedule' },
    { label: 'Resumen', routerLink: 'overview' },
  ];
}
