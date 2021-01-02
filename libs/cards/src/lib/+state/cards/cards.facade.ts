import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Card } from '../../..';
import * as CardsActions from './cards.actions';
import * as fromCards from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

@Injectable()
export class CardsFacade {
  deckLoaded$: Observable<boolean> = this.store.pipe(
    select(CardsSelectors.getDeckLoaded)
  );
  remaining$: Observable<number> = this.store.pipe(
    select(CardsSelectors.getDeck),
    pluck('remaining')
  );

  playedCards$: Observable<Card[]> = this.store.pipe(
    select(CardsSelectors.getDeck),
    pluck('playedCards')
  );

  constructor(private readonly store: Store<fromCards.CardsPartialState>) {}

  createNewDeck(): void {
    this.store.dispatch(CardsActions.createNewDeck());
  }
}
