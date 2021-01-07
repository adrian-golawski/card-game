import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Card } from '../../interfaces/deck-of-cards-api';
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
    map((deck) => deck?.remaining)
  );

  playedCards$: Observable<Card[]> = this.store.pipe(
    select(CardsSelectors.getDeck),
    map((deck) => deck?.playedCards || [])
  );

  deckId$: Observable<string> = this.store.pipe(
    select(CardsSelectors.getDeck),
    map((deck) => deck?.id)
  );

  constructor(private readonly store: Store<fromCards.CardsPartialState>) {}

  createNewDeck(): void {
    this.store.dispatch(CardsActions.createNewDeck());
  }

  drawNewCard(): void {
    this.store.dispatch(CardsActions.drawNewCard());
  }
}
