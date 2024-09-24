import { Component } from '@angular/core';
import { LayoutService } from '../../data/services';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(public layoutService: LayoutService) {}

  get colorScheme(): string {
    return this.layoutService.config().colorScheme;
  }
}
