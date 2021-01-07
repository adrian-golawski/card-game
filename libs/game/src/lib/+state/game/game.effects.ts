import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CardsFacade,
  createNewDeckSuccess,
  drawNewCardFailure,
  drawNewCardSuccess,
} from '@card-game/cards';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { compareCards } from '../../helpers/compare-cards';
import { ROUND_COUNT } from '../../tokens';
import {
  continueGame,
  endGame,
  restartGame,
  restartGameComplete,
  startExistingGame,
  startGameSuccess,
  startNewGame,
  startNewGameRequest,
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
    private readonly router: Router,
    @Inject(ROUND_COUNT) private readonly roundCount: number
  ) {}

  startNewGame$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(startNewGame),
      tap(() => this.cardsFacade.createNewDeck()),
      map(() => startNewGameRequest())
    )
  );

  startExistingGame$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(startExistingGame),
      withLatestFrom(this.gameFacade.score$, this.gameFacade.roundsLeft$),
      tap(() => this.router.navigate(['game'])),
      map(([_, score, rounds]) => startGameSuccess({ rounds, score }))
    )
  );

  startNewGameSuccess$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(createNewDeckSuccess),
      tap(() => this.router.navigate(['game'])),
      map(() => startGameSuccess({ rounds: this.roundCount, score: 0 }))
    )
  );

  verifyBetRequest$: Observable<Action> = createEffect(() =>
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
        const compare = compareCards(card.value, betDetails.cardValue);

        if (compare === -1) {
          return verifyBetSuccess({ win: betDetails.betLower });
        } else if (compare === 1) {
          return verifyBetSuccess({ win: !betDetails.betLower });
        } else {
          // Specification unclear. I consider the player lucky enough to win this
          return verifyBetSuccess({ win: true });
        }
      })
    )
  );

  verifyBetFailure$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(drawNewCardFailure),
      map(({ error }) => verifyBetFailure({ error }))
    )
  );

  endGameCheck$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(verifyBetSuccess),
      withLatestFrom(this.gameFacade.roundsLeft$),
      map(([_, roundsLeft]) => {
        if (roundsLeft > 1) {
          return continueGame();
        } else {
          return endGame();
        }
      })
    )
  );

  restartGame$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(restartGame),
      tap(() => this.router.navigate([''])),
      map(() => restartGameComplete())
    )
  );
}
