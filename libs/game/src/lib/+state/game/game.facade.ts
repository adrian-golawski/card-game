import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as GameActions from './game.actions';
import * as fromGame from './game.reducer';

@Injectable()
export class GameFacade {
  constructor(private readonly store: Store<fromGame.GamePartialState>) {}
}
