import { Action } from '@ngrx/store';

import * as CardActions from './cards.actions';
import { DeckEntity } from './cards.models';
import { initialState, reducer, State } from './cards.reducer';

const createDeckEntity = (id: string) =>
  ({
    id,
    remaining: 52,
  } as DeckEntity);

describe('Cards Reducer', () => {
  describe('valid Card Actions', () => {
    const stateWithDeckLoaded = () =>
      ({
        entities: {
          mockId: createDeckEntity('mockId'),
        },
        error: null,
        deckLoaded: true,
        ids: ['mockId'],
        selectedId: 'mockId',
      } as State);

    describe('getNewDeck()', () => {
      it('should set error and loaded to false', () => {
        const action = CardActions.getNewDeck();

        const result: State = reducer(initialState, action);
        console.log(initialState);
        expect(result.deckLoaded).toEqual(false);
        expect(result.error).toEqual(undefined);
      });

      it('should delete existing Deck from state', () => {
        const action = CardActions.getNewDeck();

        const result: State = reducer(stateWithDeckLoaded(), action);

        expect(result.deckLoaded).toBe(false);
        expect(result.error).toEqual(undefined);
        expect(result.entities).toEqual({});
      });
    });

    describe('getNewDeckSuccess()', () => {
      it('should set new Deck', () => {
        const deck = createDeckEntity('newMockId');
        const action = CardActions.getNewDeckSuccess({ deck });

        const result: State = reducer(initialState, action);
        expect(result.deckLoaded).toEqual(true);
        expect(result.error).toEqual(null);
        expect(result.entities[deck.id]).toEqual(deck);
        expect(result.selectedId).toEqual(deck.id);
      });
    });

    describe('getNewDeckFailure()', () => {
      it('should set error and restore empty Deck', () => {
        const error = new Error('mockError');
        const action = CardActions.getNewDeckFailure({ error });

        const result: State = reducer(initialState, action);
        expect(result.deckLoaded).toEqual(false);
        expect(result.error).toEqual(error);
        expect(result.selectedId).toEqual(undefined);
      });
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
