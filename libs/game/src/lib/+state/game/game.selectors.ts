import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GamePartialState, GAME_FEATURE_KEY, State } from './game.reducer';

export const getGameState = createFeatureSelector<GamePartialState, State>(
  GAME_FEATURE_KEY
);

export const getScore = createSelector(
  getGameState,
  (state: State) => state.score
);

export const gameInProgress = createSelector(
  getGameState,
  (state: State) => state.gameActive
);

export const gameLoading = createSelector(
  getGameState,
  (state: State) => state.gameLoading
);

export const resultLoading = createSelector(
  getGameState,
  (state: State) => state.resultLoading
);

export const roundsLeft = createSelector(
  getGameState,
  (state: State) => state.roundsLeft
);

export const betGiven = createSelector(
  getGameState,
  (state: State) => state.betGiven
);

export const betLower = createSelector(
  getGameState,
  (state: State) => state.betLower
);

export let betDetails = createSelector(getGameState, (state: State) => ({
  cardValue: state.betCardValue,
  betLower: state.betLower,
}));

export let winHistory = createSelector(
  getGameState,
  (state: State) => state.winHistory
);

export let error = createSelector(getGameState, (state: State) => state.error);
