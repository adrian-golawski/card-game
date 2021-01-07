import { CardValue } from '@card-game/cards';
import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction('[Game] Start New Game');
export const startNewGameRequest = createAction(
  '[Game] Start New Game Request'
);

export const restartGame = createAction('[Game] Restart Game');
export const restartGameComplete = createAction('[Game] Restart Game Complete');

export const startExistingGame = createAction('[Game] Start Existing Game');

export const startGameSuccess = createAction(
  '[Game] Start New Game Success',
  props<{ rounds: number; score: number }>()
);
export const startNewGameFailure = createAction(
  '[Game] Start New Game Failure'
);

export const continueGame = createAction('[Game] Continue Game');

export const endGame = createAction('[Game] End Game');

export const betGiven = createAction(
  '[Game] Bet given',
  props<{ lower: boolean }>()
);

export const verifyBet = createAction(
  '[Game] Verify Bet',
  props<{ lower: boolean }>()
);

export const verifyBetRequest = createAction(
  '[Game] Verify Bet Request',
  props<{ cardValue: CardValue }>()
);

export const verifyBetSuccess = createAction(
  '[Game] Verify Bet Success',
  props<{ win: boolean }>()
);
export const verifyBetFailure = createAction(
  '[Game] Verify Bet Failure',
  props<{ error: Error }>()
);
