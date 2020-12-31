import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

import { GameEntity } from './game.models';

export const GAME_FEATURE_KEY = 'card';

export interface State extends EntityState<GameEntity> {
  deckLoaded: boolean;
  selectedId?: number;
  error?: Error;
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const cardAdapter: EntityAdapter<GameEntity> = createEntityAdapter<
  GameEntity
>();

export const initialState: State = cardAdapter.getInitialState({
  deckLoaded: false,
});

const gamesReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action): State {
  return gamesReducer(state, action);
}
