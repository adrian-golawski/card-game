import { Injectable } from '@angular/core';
import * as CardActions from '@card-game/cards';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as GameActions from './game.actions';

@Injectable()
export class GameEffects {
  constructor(private readonly actions$: Actions) {}

  public startNewGame$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.startNewGame),
      map(CardActions.getNewDeck)
    )
  );
}
