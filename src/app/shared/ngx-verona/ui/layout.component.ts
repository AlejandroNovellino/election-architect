import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LayoutService } from '@shared/ngx-verona/data/services/layout.service';
import { MenuService } from '@shared/ngx-verona/data/services/menu.service';
import { SideBarComponent } from '@shared/ngx-verona/ui/side-bar/side-bar.component';
import { TopBarComponent } from '@shared/ngx-verona/ui/top-bar/top-bar.component';
import { filter, Subscription } from 'rxjs';
import { LayoutConfigComponent } from '../config/layout-config.component';
import { TabCloseEvent } from '../data/interfaces';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    SideBarComponent,
    RouterModule,
    FooterComponent,
    BreadcrumbComponent,
    LayoutConfigComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnDestroy {
  // services injected
  private readonly menuService: MenuService = inject(MenuService);
  public readonly layoutService: LayoutService = inject(LayoutService);
  public readonly renderer: Renderer2 = inject(Renderer2);
  public readonly router: Router = inject(Router);

  overlayMenuOpenSubscription: Subscription;

  tabOpenSubscription: Subscription;

  tabCloseSubscription: Subscription;

  menuOutsideClickListener: any;

  menuScrollListener: any;

  @ViewChild(SideBarComponent) appSidebar!: SideBarComponent;

  @ViewChild(TopBarComponent) appTopbar!: TopBarComponent;

  constructor() {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );
              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }

        if (
          (this.layoutService.isSlim() || this.layoutService.isSlimPlus()) &&
          !this.menuScrollListener
        ) {
          this.menuScrollListener = this.renderer.listen(
            this.appSidebar.menuContainer.nativeElement,
            'scroll',
            (event) => {
              if (this.layoutService.isDesktop()) {
                this.hideMenu();
              }
            }
          );
        }

        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
      });

    this.tabOpenSubscription = this.layoutService.tabOpen$.subscribe((tab) => {
      this.router.navigate(tab.routerLink);
      this.layoutService.openTab(tab);
    });

    this.tabCloseSubscription = this.layoutService.tabClose$.subscribe(
      (event: TabCloseEvent) => {
        if (
          this.router.isActive(event.tab.routerLink[0], {
            paths: 'subset',
            queryParams: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored',
          })
        ) {
          const tabs = this.layoutService.tabs;

          if (tabs.length > 1) {
            if (event.index === tabs.length - 1)
              this.router.navigate(tabs[tabs.length - 2].routerLink);
            else this.router.navigate(tabs[event.index + 1].routerLink);
          } else {
            this.router.navigate(['/']);
          }
        }

        this.layoutService.closeTab(event.index);
      }
    );
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    this.menuService.reset();
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }

    if (this.menuScrollListener) {
      this.menuScrollListener();
      this.menuScrollListener = null;
    }

    this.unblockBodyScroll();
  }

  get containerClass() {
    return {
      'layout-slim': this.layoutService.config().menuMode === 'slim',
      'layout-slim-plus': this.layoutService.config().menuMode === 'slim-plus',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config().menuMode === 'static',
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
      'layout-light':
        this.layoutService.config().layoutTheme === 'colorScheme' &&
        this.layoutService.config().colorScheme === 'light',
      'layout-dark':
        this.layoutService.config().layoutTheme === 'colorScheme' &&
        this.layoutService.config().colorScheme === 'dark',
      'layout-primary':
        this.layoutService.config().colorScheme !== 'dark' &&
        this.layoutService.config().layoutTheme === 'primaryColor',
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }

    if (this.tabOpenSubscription) {
      this.tabOpenSubscription.unsubscribe();
    }

    if (this.tabCloseSubscription) {
      this.tabCloseSubscription.unsubscribe();
    }
  }
}
