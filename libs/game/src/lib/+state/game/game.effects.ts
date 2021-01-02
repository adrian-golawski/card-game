import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CardsFacade,
  createNewDeckSuccess,
  drawNewCardSuccess,
} from '@card-game/cards';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { compareCards } from '../../helpers/compare-cards';
import {
  startNewGame,
  startNewGameRequest,
  startNewGameSuccess,
  verifyBet,
  verifyBetFailure,
  verifyBetRequest,
  verifyBetSuccess,
} from './game.actions';
import { GameFacade } from './game.facade';

@Injectable()
export class GameEffects {
  constructor(
    private readonly actions: Actions,
    private readonly cardsFacade: CardsFacade,
    private readonly gameFacade: GameFacade,
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

  verifyBet$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(verifyBet),
      withLatestFrom(this.cardsFacade.playedCards$),
      map(([_, cards]) => [...cards].pop()),
      map((lastCardPlayed) =>
        verifyBetRequest({ cardValue: lastCardPlayed.value })
      ),
      tap(() => this.cardsFacade.drawNewCard())
    )
  );

  verifyBetResult$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(drawNewCardSuccess),
      withLatestFrom(this.gameFacade.betDetails$),
      map(([{ card }, betDetails]) => {
        console.log(card, betDetails);
        const compare = compareCards(card.value, betDetails.cardValue);

        if (compare === -1) {
          return verifyBetSuccess({ win: betDetails.betLower });
        } else if (compare === 1) {
          return verifyBetSuccess({ win: !betDetails.betLower });
        }

        throw new Error('WTF');
      })
    )
  );
}
