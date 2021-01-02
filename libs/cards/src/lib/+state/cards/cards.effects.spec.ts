import { TestBed } from '@angular/core/testing';
import { CardsFacade, CardValue } from '@card-game/cards';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable, of } from 'rxjs';

import { CardsService } from '../../services/cards.service';
import * as CardActions from './cards.actions';
import { CardsEffects } from './cards.effects';

describe('CardsEffects', () => {
  let actions: Observable<Action>;
  let effects: CardsEffects;
  let cardsService: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: CardsService,
          useValue: {
            getNewDeck: jest.fn(() =>
              of({
                success: true,
                deck_id: '3p40paa87x90',
                shuffled: true,
                remaining: 52,
              })
            ),
            drawCardFromDeck: jest.fn(() =>
              of({
                cards: [
                  {
                    image: 'https://deckofcardsapi.com/static/img/KH.png',
                    value: CardValue.KING,
                    suit: 'HEARTS',
                    code: 'KH',
                  },
                ],
              })
            ),
          },
        },
        {
          provide: CardsFacade,
          useValue: {
            deckId$: of('3p40paa87x90'),
          },
        },
      ],
    });

    effects = TestBed.inject(CardsEffects);
    cardsService = TestBed.inject(CardsService);
  });

  describe('createNewDeck$', () => {
    it('should request new deck of cards', () => {
      const { getNewDeck, drawCardFromDeck } = cardsService;
      actions = hot('-a-|', { a: CardActions.createNewDeck() });

      const expected = hot('-a-|', {
        a: CardActions.createNewDeckSuccess({
          deck: {
            id: '3p40paa87x90',
            remaining: 52,
            playedCards: [
              {
                image: 'https://deckofcardsapi.com/static/img/KH.png',
                value: CardValue.KING,
                suit: 'HEARTS',
                code: 'KH',
              },
            ],
          },
        }),
      });

      expect(effects.createNewDeck$).toBeObservable(expected);
      expect(getNewDeck).toBeCalled();
      expect(drawCardFromDeck).toBeCalled();
    });
  });

  describe('drawNewCard$', () => {
    it('should request new card for a given deck', () => {
      const { drawCardFromDeck } = cardsService;
      actions = hot('-a-|', { a: CardActions.drawNewCard() });

      const expected = hot('-a-|', {
        a: CardActions.drawNewCardSuccess({
          card: {
            image: 'https://deckofcardsapi.com/static/img/KH.png',
            value: CardValue.KING,
            suit: 'HEARTS',
            code: 'KH',
          },
        }),
      });

      expect(effects.drawNewCard$).toBeObservable(expected);
      expect(drawCardFromDeck).toBeCalled();
    });
  });
});
