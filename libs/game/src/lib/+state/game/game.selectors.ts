import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GamePartialState, GAME_FEATURE_KEY, State } from './game.reducer';

export const getGameState = createFeatureSelector<GamePartialState, State>(
  GAME_FEATURE_KEY
);

export const getScore = createSelector(
  getGameState,
  (state: State) => state.score
);
