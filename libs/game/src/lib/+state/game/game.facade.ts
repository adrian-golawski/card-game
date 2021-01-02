import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as GameActions from './game.actions';
import * as fromGame from './game.reducer';
import * as GameSelectors from './game.selectors';

@Injectable()
export class GameFacade {
  score$: Observable<number> = this.store.pipe(select(GameSelectors.getScore));
  gameInProgress$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.gameInProgress)
  );
  roundsLeft$: Observable<number> = this.store.pipe(
    select(GameSelectors.roundsLeft)
  );
  betGiven$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.betGiven)
  );
  betLower$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.betLower)
  );

  constructor(private readonly store: Store<fromGame.GamePartialState>) {}

  startNewGame(): void {
    this.store.dispatch(GameActions.startNewGame());
  }

  betLower(lower: boolean): void {
    this.store.dispatch(GameActions.betLower({ lower }));
  }
}
