import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

import { DeckEntity } from './cards.models';

export const CARDS_FEATURE_KEY = 'card';

export interface State extends EntityState<DeckEntity> {
  deckLoaded: boolean;
  selectedId?: number;
  error?: Error;
}

export interface CardsPartialState {
  readonly [CARDS_FEATURE_KEY]: State;
}

export const cardAdapter: EntityAdapter<DeckEntity> = createEntityAdapter<
  DeckEntity
>();

export const initialState: State = cardAdapter.getInitialState({
  deckLoaded: false,
});

const cardsReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action): State {
  return cardsReducer(state, action);
}
