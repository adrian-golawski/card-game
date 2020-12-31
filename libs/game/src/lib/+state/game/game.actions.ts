import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction('[Game] Start New Game');
export const startNewGameSuccess = createAction(
  '[Game] Start New Game Success'
);
export const startNewGameFailure = createAction(
  '[Game] Start New Game Failure',
  props<{ error: Error }>()
);
