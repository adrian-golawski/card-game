import { Route } from '@angular/router';
import { GameContainerComponent } from '@card-game/game';
import { SummaryContainerComponent } from '@card-game/summary';
import { WelcomeContainerComponent } from '@card-game/welcome';

import { DeckGuard } from './deck.guard';

export const routes: Route[] = [
  {
    path: '',
    component: WelcomeContainerComponent,
  },
  {
    path: 'game',
    component: GameContainerComponent,
    canActivate: [DeckGuard],
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
