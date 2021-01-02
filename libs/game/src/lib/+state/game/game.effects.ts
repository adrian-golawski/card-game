import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CardsFacade, createNewDeckSuccess } from '@card-game/cards';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  startNewGame,
  startNewGameRequest,
  startNewGameSuccess,
} from './game.actions';

@Injectable()
export class GameEffects {
  constructor(
    private readonly actions: Actions,
    private readonly cardsFacade: CardsFacade,
    private readonly router: Router
  ) {}

  startNewGame$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(startNewGame),
      tap(() => this.cardsFacade.createNewDeck()),
      map(() => startNewGameRequest())
    )
  );

  startNewGameSuccess$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(createNewDeckSuccess),
      tap(() => this.router.navigate(['game'])),
      map(() => startNewGameSuccess())
    )
  );
}
