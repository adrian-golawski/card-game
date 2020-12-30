import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '**',
    redirectTo: '/',
  },
];
