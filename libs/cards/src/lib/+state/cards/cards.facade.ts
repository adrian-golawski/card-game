import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCards from './cards.reducer';

@Injectable()
export class CardsFacade {
  constructor(private readonly store: Store<fromCards.CardsPartialState>) {}
}
