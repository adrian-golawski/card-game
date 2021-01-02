import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CardActions from './cards.actions';
import { DeckEntity } from './cards.models';

export const CARDS_FEATURE_KEY = 'card';

export interface State extends EntityState<DeckEntity> {
  deckLoaded: boolean;
  cardLoading: boolean;
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
  cardLoading: false,
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
  })),
  on(CardActions.drawNewCard, (state) => ({
    ...state,
    cardLoading: true,
    error: null,
  })),
  on(CardActions.drawNewCardSuccess, (state, { card }) =>
    cardAdapter.updateOne(
      {
        id: state.selectedId,
        changes: {
          playedCards: [...state.entities[state.selectedId].playedCards, card],
        },
      },
      {
        ...state,
        cardLoading: false,
      }
    )
  ),
  on(CardActions.drawCardFailure, (state, { error }) => ({
    ...state,
    cardLoading: false,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return cardsReducer(state, action);
}
