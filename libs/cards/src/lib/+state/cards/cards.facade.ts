import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromCards from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

@Injectable()
export class CardsFacade {
  deckLoaded$: Observable<boolean> = this.store.pipe(
    select(CardsSelectors.getDeckLoaded)
  );
  constructor(private readonly store: Store<fromCards.CardsPartialState>) {}
}
