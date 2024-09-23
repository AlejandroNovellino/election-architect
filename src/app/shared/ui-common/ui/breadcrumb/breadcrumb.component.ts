import { Component, signal, WritableSignal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  imports: [RouterModule],
})
export class BreadcrumbComponent {
  public readonly breadcrumbs: WritableSignal<Breadcrumb[]> = signal([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const root = this.router.routerState.snapshot.root;
        console.log(`🚀 ~ BreadcrumbComponent ~ .subscribe ~ root:`, root);
        const breadcrumbs: Breadcrumb[] = [];

        this.addBreadcrumb(root, [], breadcrumbs);

        console.log(
          `🚀 ~ BreadcrumbComponent ~ .subscribe ~ breadcrumbs:`,
          breadcrumbs
        );

        this.breadcrumbs.set(breadcrumbs);
      });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
    const breadcrumb = route.data['breadcrumb'];
    const parentBreadcrumb =
      route.parent && route.parent.data
        ? route.parent.data['breadcrumb']
        : null;

    if (breadcrumb && breadcrumb !== parentBreadcrumb) {
      breadcrumbs.push({
        label: route.data['breadcrumb'],
        url: '/' + routeUrl.join('/'),
      });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
