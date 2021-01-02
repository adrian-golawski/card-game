import { Injectable } from '@angular/core';
import { CardValue } from '@card-game/cards';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as GameActions from './game.actions';
import * as fromGame from './game.reducer';
import * as GameSelectors from './game.selectors';

@Injectable()
export class GameFacade {
  score$: Observable<number> = this.store.pipe(
    select(GameSelectors.getScore),
    // tslint:disable-next-line:no-magic-numbers
    map((score) => score / 10)
  );
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

  gameLoading$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.gameLoading)
  );

  resultLoading$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.resultLoading)
  );

  betDetails$: Observable<{
    cardValue: CardValue;
    betLower: boolean;
  }> = this.store.pipe(select(GameSelectors.betDetails));

  constructor(private readonly store: Store<fromGame.GamePartialState>) {}

  startNewGame(): void {
    this.store.dispatch(GameActions.startNewGame());
  }

  giveBet(lower: boolean): void {
    this.store.dispatch(GameActions.betGiven({ lower }));
  }

  verifyBet(): void {
    this.store.dispatch(GameActions.verifyBet());
  }
}
