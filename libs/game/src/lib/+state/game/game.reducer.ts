import { Action, createReducer, on } from '@ngrx/store';

import * as GameActions from './game.actions';
export const GAME_FEATURE_KEY = 'game';

export interface State {
  score: number;
  gameActive?: boolean;
  roundsLeft?: number;
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const initialState: State = {
  score: 0,
};

const gamesReducer = createReducer(
  initialState,
  on(GameActions.startNewGameSuccess, (state) => ({
    ...state,
    score: 0,
    gameActive: true,
    roundsLeft: 30,
  }))
);

export function reducer(state: State, action: Action): State {
  return gamesReducer(state, action);
}
