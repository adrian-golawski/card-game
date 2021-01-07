import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  CardsFacade,
  CardValue,
  createNewDeckSuccess,
  drawNewCardSuccess,
} from '@card-game/cards';
import { GameFacade, ROUND_COUNT } from '@card-game/game';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable, of } from 'rxjs';

import {
  continueGame,
  startExistingGame,
  startGameSuccess,
  startNewGame,
  startNewGameRequest,
  verifyBet,
  verifyBetRequest,
  verifyBetSuccess,
} from './game.actions';
import { GameEffects } from './game.effects';

describe('GameEffects', () => {
  let actions: Observable<Action>;
  let effects: GameEffects;
  let router: Router;
  let cardsFacade: CardsFacade;
  let gameFacade: GameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GameEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: CardsFacade,
          useValue: {
            createNewDeck: jest.fn(),
            drawNewCard: jest.fn(),
            playedCards$: of([
              {
                image: 'https://deckofcardsapi.com/static/img/KH.png',
                value: CardValue.KING,
                suit: 'HEARTS',
                code: 'KH',
              },
            ]),
          },
        },
        {
          provide: GameFacade,
          useValue: {
            betDetails$: of('3p40paa87x90'),
            // tslint:disable-next-line:no-magic-numbers
            roundsLeft$: of(10),
            // tslint:disable-next-line:no-magic-numbers
            score$: of(4),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        {
          provide: ROUND_COUNT,
          useValue: 30,
        },
      ],
    });
    router = TestBed.inject(Router);
    cardsFacade = TestBed.inject(CardsFacade);
    gameFacade = TestBed.inject(GameFacade);
  });

  describe('startNewGame$', () => {
    it('should request new Deck creation', () => {
      effects = TestBed.inject(GameEffects);
      const { createNewDeck } = cardsFacade;
      actions = hot('-a-|', { a: startNewGame() });

      const expected = hot('-a-|', {
        a: startNewGameRequest(),
      });

      expect(effects.startNewGame$).toBeObservable(expected);
      expect(createNewDeck).toBeCalled();
    });
  });

  describe('startNewGameSuccess$', () => {
    it('should navigate to /game and set initial round values', () => {
      effects = TestBed.inject(GameEffects);
      const { navigate } = router;
      actions = hot('-a-|', { a: createNewDeckSuccess({ deck: undefined }) });

      const expected = hot('-a-|', {
        a: startGameSuccess({
          rounds: 30,
          score: 0,
        }),
      });

      expect(effects.startNewGameSuccess$).toBeObservable(expected);
      expect(navigate).toBeCalledWith(['game']);
    });
  });

  describe('startExistingGame$', () => {
    it('should navigate to /game and set saved round values', () => {
      effects = TestBed.inject(GameEffects);
      const { navigate } = router;
      actions = hot('-a-|', { a: startExistingGame() });

      const expected = hot('-a-|', {
        a: startGameSuccess({
          rounds: 10,
          score: 4,
        }),
      });

      expect(effects.startExistingGame$).toBeObservable(expected);
      expect(navigate).toBeCalledWith(['game']);
    });
  });

  describe('verifyBetRequest$', () => {
    it('should save last played Card and request a new Card', () => {
      effects = TestBed.inject(GameEffects);
      const { drawNewCard } = cardsFacade;
      actions = hot('-a-|', { a: verifyBet({ lower: true }) });

      const expected = hot('-a-|', {
        a: verifyBetRequest({
          cardValue: CardValue.KING,
        }),
      });

      expect(effects.verifyBetRequest$).toBeObservable(expected);
      expect(drawNewCard).toBeCalled();
    });
  });

  describe('verifyBetResult$', () => {
    it('should verify the bet and return win or lose result', () => {
      effects = TestBed.inject(GameEffects);
      const { drawNewCard } = cardsFacade;
      actions = hot('-a-|', {
        a: drawNewCardSuccess({
          card: {
            image: 'https://deckofcardsapi.com/static/img/QH.png',
            value: CardValue.QUEEN,
            suit: 'HEARTS',
            code: 'QH',
          },
        }),
      });

      const expected = hot('-a-|', {
        a: verifyBetSuccess({ win: true }),
      });

      expect(effects.verifyBetResult$).toBeObservable(expected);
    });
  });

  describe('endGameCheck$', () => {
    it('should continue game if there are more rounds', () => {
      effects = TestBed.inject(GameEffects);
      const { navigate } = router;
      actions = hot('-a-|', { a: verifyBetSuccess({ win: true }) });

      const expected = hot('-a-|', {
        a: continueGame(),
      });

      expect(effects.endGameCheck$).toBeObservable(expected);
      expect(navigate).not.toBeCalled();
    });
  });
});
