import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CardActions from './cards.actions';
import { DeckEntity } from './cards.models';

export const CARDS_FEATURE_KEY = 'card';

export interface State extends EntityState<DeckEntity> {
  deckLoaded: boolean;
  selectedId?: string;
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

const cardsReducer = createReducer(
  initialState,
  on(CardActions.createNewDeck, (state) =>
    cardAdapter.removeAll({
      ...state,
      deckLoaded: false,
    })
  ),
  on(CardActions.createNewDeckSuccess, (state, { deck }) =>
    cardAdapter.setOne(deck, {
      ...state,
      selectedId: deck.id,
      deckLoaded: true,
    })
  ),
  on(CardActions.createNewDeckFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return cardsReducer(state, action);
}
