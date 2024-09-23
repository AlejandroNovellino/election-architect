import {
  Component,
  computed,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../data/services/layout.service';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AuthenticationService } from '../../../../auth/services/index';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    StyleClassModule,
    RippleModule,
  ],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  menu: MenuItem[] = [];

  @ViewChild('searchinput') searchInput!: ElementRef;

  @ViewChild('menubutton') menuButton!: ElementRef;

  searchActive: boolean = false;

  //* signals to get the data
  readonly authenticatedUser = computed(() =>
    this.authService.authenticatedUser()
  );

  // * injected services
  private readonly authService: AuthenticationService = inject(
    AuthenticationService
  );

  constructor(public layoutService: LayoutService) {}

  onSignOut(): void {
    this.authService.signOut();
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  activateSearch() {
    this.searchActive = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }

  deactivateSearch() {
    this.searchActive = false;
  }

  removeTab(event: MouseEvent, item: MenuItem, index: number) {
    this.layoutService.onTabClose(item, index);
    event.preventDefault();
  }

  get layoutTheme(): string {
    return this.layoutService.config().layoutTheme;
  }

  get colorScheme(): string {
    return this.layoutService.config().colorScheme;
  }

  get logo(): string {
    const path = 'assets/layout/images/logo.png';
    const logo =
      this.layoutTheme === 'primaryColor' &&
      !(this.layoutService.config().theme == 'yellow')
        ? 'light.png'
        : this.colorScheme === 'light'
        ? 'dark.png'
        : 'light.png';
    // return path + logo;
    return path;
  }

  get tabs(): MenuItem[] {
    return this.layoutService.tabs;
  }
}
