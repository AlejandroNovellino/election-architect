import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/ngx-verona/ui/layout.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mail',
        title: 'Mail',
        loadComponent: () => import('@mail-app/mail.component'),
        children: [
          { path: '', redirectTo: 'inbox', pathMatch: 'full' },
          {
            path: 'detail/:id',
            loadComponent: () =>
              import(
                '@mail-app/feature-response/mail-detail/mail-detail.component'
              ),
          },
          {
            path: 'inbox',
            loadComponent: () =>
              import('@mail-app/feature-inbox/mail-inbox/mail-inbox.component'),
          },
          {
            path: 'challenge',
            loadComponent: () =>
              import(
                '@mail-app/feature-inbox/mail-challenge/mail-challenge.component'
              ),
          },
          {
            path: 'candidature',
            loadComponent: () =>
              import(
                '@mail-app/feature-inbox/mail-candidature/mail-candidature.component'
              ),
          },
          {
            path: 'complaint',
            loadComponent: () =>
              import(
                '@mail-app/feature-inbox/mail-complaint/mail-complaint.component'
              ),
          },
          {
            path: 'starred',
            loadComponent: () =>
              import(
                '@mail-app/feature-inbox/mail-starred/mail-starred.component'
              ),
          },
          {
            path: 'spam',
            loadComponent: () =>
              import('@mail-app/feature-inbox/mail-spam/mail-spam.component'),
          },
          {
            path: 'important',
            loadComponent: () =>
              import(
                '@mail-app/feature-inbox/mail-important/mail-important.component'
              ),
          },
          {
            path: 'sent',
            loadComponent: () =>
              import('@mail-app/feature-inbox/mail-sent/mail-sent.component'),
          },
          {
            path: 'archived',
            loadComponent: () =>
              import(
                '@mail-app/feature-inbox/mail-archive/mail-archive.component'
              ),
          },
          {
            path: 'trash',
            loadComponent: () =>
              import('@mail-app/feature-inbox/mail-trash/mail-trash.component'),
          },
          {
            path: 'compose',
            loadComponent: () =>
              import(
                '@mail-app/feature-response/mail-compose/mail-compose.component'
              ),
          },
        ],
      },
      {
        path: 'electoral-events',
        title: 'Electoral Events',
        children: [
          {
            path: 'drafts',
            title: 'Electoral Event Drafts',
            loadComponent: () =>
              import(
                '@electoral-events/feature-manage-drafts/feature-manage-drafts.component'
              ),
          },
          {
            path: 'create-draft',
            title: 'Create Electoral Event Draft',
            loadComponent: () =>
              import(
                '@electoral-events/feature-create-event/feature-create-event.component'
              ),
            children: [
              {
                path: 'info',
                loadComponent: () =>
                  import(
                    '@electoral-events/feature-create-event/details-step/details-step.component'
                  ),
              },
              {
                path: 'charges',
                loadComponent: () =>
                  import(
                    '@electoral-events/feature-create-event/elective-offices-step/elective-offices-step.component'
                  ),
              },
              {
                path: 'schedule',
                loadComponent: () =>
                  import(
                    '@electoral-events/feature-create-event/schedule-step/schedule-step.component'
                  ),
              },
              {
                path: 'overview',
                loadComponent: () =>
                  import(
                    '@electoral-events/feature-create-event/overview-step/overview-step.component'
                  ),
              },
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full',
              },
              {
                path: '**',
                redirectTo: 'info',
                pathMatch: 'full',
              },
            ],
          },
          {
            path: '',
            redirectTo: 'drafts',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'population',
        loadComponent: () =>
          import(
            './organization-management/feature-population-managment/PopulationTypes/PopulationTypes.component'
          ),
      },
      {
        path: 'dependency',
        loadComponent: () =>
          import(
            './organization-management/feature-dependencies-management/Dependencies/Dependencies.component'
          ),
      },
      {
        path: 'office',
        loadComponent: () =>
          import(
            './organization-management/feature-office-management/Offices/Offices.component'
          ),
      },
      {
        path: 'co-goverments',
        title: 'Co-Gobiernos',
        loadComponent: () =>
          import(
            './organization-management/feature-co-goverments-management/featureCoGovermentsManagement.component'
          ),
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          {
            path: 'types',
            loadComponent: () =>
              import(
                './organization-management/feature-co-goverments-management/CoGovermentTypes/CoGovermentTypes.component'
              ),
          },
          {
            path: 'all',
            loadComponent: () =>
              import(
                './organization-management/feature-co-goverments-management/CoGoverments/CoGoverments.component'
              ),
          },
          {
            path: 'detail/:id',
            loadComponent: () =>
              import(
                './organization-management/feature-co-goverments-management/InfoCoGoverment/InfoCoGoverment.component'
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './organization-management/feature-co-goverments-management/NewCoGoverment/NewCoGoverment.component'
              ),
          },
        ],
      },

      {
        path: 'ballot-designer',
        loadComponent: () =>
          import(
            './ballot-designer/feature-ballot-management/featureBallotManagement.component'
          ),
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './ballot-designer/feature-ballot-management/BallotCreator/BallotCreator.component'
              ),
          },
          {
            path: 'all',
            loadComponent: () =>
              import(
                './ballot-designer/feature-ballot-management/Ballots/Ballots.component'
              ),
          },
        ],
      },

      {
        path: 'electoral-activities',
        loadComponent: () =>
          import(
            './organization-management/feature-electoral-activities-management/ElectoralActivities/ElectoralActivities.component'
          ),
      },
      {
        path: 'activities-responsables',
        loadComponent: () =>
          import(
            './organization-management/feature-responsibles-management/ActivityResponsible/ActivityResponsible.component'
          ),
      },
      {
        path: '',
        redirectTo: 'electoral-events/drafts',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'electoral-events',
    pathMatch: 'full',
  },
];
