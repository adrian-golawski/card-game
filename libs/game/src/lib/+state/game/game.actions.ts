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

export const betLower = createAction(
  '[Game] Bet lower',
  props<{ lower: boolean }>()
);
