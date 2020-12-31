// Welcome page

// Retrieve from cache -> Deck Id

// Set continue
// Get Existing Deck -> Played Pile Request
// Show played Pile
//   or
// New Game
// Get new Deck -> Deck Request

// Draw Card -> Card Request
// Ask Question -> Answer
// Return Card <- Card Request
// Validate Answer <- Answer
// Add Card to deck -> Add Pile Request
// Card Added <- Add Pile Request

// Remaining = 0
// End Deck -> Remove Deck
// Show score
// Move to Welcome

import { createAction, props } from '@ngrx/store';

import { Card } from '../../interfaces/deck-of-cards-api';
import { DeckEntity } from './cards.models';

export const getDeckFromCache = createAction('[Cards] Get Deck from Cache');
export const getDeckFromCacheSuccess = createAction(
  '[Cards] Get Deck from Cache Success',
  props<{ deck: DeckEntity }>()
);
export const getDeckFromCacheFailure = createAction(
  '[Cards] Get Deck from Cache Failure'
);

export const getPlayedCards = createAction(
  '[Cards] Get played Cards',
  props<{ deckId: string }>()
);
export const getPlayedCardsSuccess = createAction(
  '[Cards] Get played Cards',
  props<{ playedCards: Card[] }>()
);
export const getPlayedCardsFailure = createAction('[Cards] Get played Cards');

export const getNewDeck = createAction('[Cards] Get New Deck');
export const getNewDeckSuccess = createAction(
  '[Cards] Get New Deck Success',
  props<{ deck: DeckEntity }>()
);
export const getNewDeckFailure = createAction(
  '[Cards] Get New Deck',
  props<{ error: Error }>()
);

export const drawCard = createAction('[Cards] Draw Card');
export const drawCardSuccess = createAction(
  '[Cards] Draw Card Success',
  props<{ card: Card }>()
);
export const drawCardFailure = createAction(
  '[Cards] Draw Card Failure',
  props<{ error: Error }>()
);

export const destroyDeck = createAction(
  '[Cards] Destroy Deck',
  props<{ deckId: string }>()
);
export const destroyDeckSuccess = createAction('[Cards] Draw Card Success');
