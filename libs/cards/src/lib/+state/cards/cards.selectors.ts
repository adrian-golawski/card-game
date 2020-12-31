import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CardsPartialState, CARDS_FEATURE_KEY, State } from './cards.reducer';

export const getCardsState = createFeatureSelector<CardsPartialState, State>(
  CARDS_FEATURE_KEY
);

export const getDeckLoaded = createSelector(
  getCardsState,
  (state: State) => state.deckLoaded
);
