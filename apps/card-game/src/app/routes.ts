import { Route } from '@angular/router';
import { GameContainerComponent } from '@card-game/game';
import { SummaryContainerComponent } from '@card-game/summary';
import { WelcomeContainerComponent } from '@card-game/welcome';

export const routes: Route[] = [
  {
    path: '',
    component: WelcomeContainerComponent,
  },
  {
    path: 'game',
    component: GameContainerComponent,
  },
  {
    path: 'summary',
    component: SummaryContainerComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
