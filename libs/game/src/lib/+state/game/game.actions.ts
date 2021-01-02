import { CardValue } from '@card-game/cards';
import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction('[Game] Start New Game');
export const startNewGameRequest = createAction(
  '[Game] Start New Game Request'
);

export const startNewGameSuccess = createAction(
  '[Game] Start New Game Success'
);
export const startNewGameFailure = createAction(
  '[Game] Start New Game Failure'
);

export const betGiven = createAction(
  '[Game] Bet given',
  props<{ lower: boolean }>()
);

export const verifyBet = createAction('[Game] Verify Bet');

export const verifyBetRequest = createAction(
  '[Game] Verify Bet Request',
  props<{ cardValue: CardValue }>()
);

export const verifyBetSuccess = createAction(
  '[Game] Verify Bet Success',
  props<{ win: boolean }>()
);
export const verifyBetFailure = createAction('[Game] Verify Bet Failure');
