import { CardValue } from '@card-game/cards';
import { Action, createReducer, on } from '@ngrx/store';

import * as GameActions from './game.actions';
export const GAME_FEATURE_KEY = 'game';

export interface State {
  resultLoading: boolean;
  betGiven: boolean;
  betLower?: boolean;
  betCardValue?: CardValue;
  gameLoading: boolean;
  score: number;
  gameActive?: boolean;
  roundsLeft?: number;
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const initialState: State = {
  score: 0,
  betGiven: false,
  gameLoading: false,
  resultLoading: false,
};

const gamesReducer = createReducer(
  initialState,
  on(GameActions.startNewGameRequest, (state) => ({
    ...state,
    gameLoading: true,
  })),
  on(GameActions.startGameSuccess, (state, { score, rounds }) => ({
    ...state,
    score: score,
    gameActive: true,
    roundsLeft: rounds,
    gameLoading: false,
  })),
  on(GameActions.betGiven, (state, { lower }) => ({
    ...state,
    betGiven: true,
    betLower: lower,
  })),
  on(GameActions.verifyBetRequest, (state, { cardValue }) => ({
    ...state,
    resultLoading: true,
    betCardValue: cardValue,
  })),
  on(GameActions.verifyBetSuccess, (state, { win }) => ({
    ...state,
    resultLoading: false,
    betGiven: false,
    betLower: undefined,
    betCardValue: undefined,
    score: win ? state.score + 1 : state.score,
  })),
  on(GameActions.continueGame, (state) => ({
    ...state,
    roundsLeft: state.roundsLeft - 1,
  })),
  on(GameActions.endGame, (state) => ({
    ...state,
    gameActive: false,
  }))
);

export function reducer(state: State, action: Action): State {
  return gamesReducer(state, action);
}
