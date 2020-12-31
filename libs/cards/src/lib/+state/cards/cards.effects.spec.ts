import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable, of } from 'rxjs';

import { CardsService } from '../../services/cards.service';
import * as CardActions from './cards.actions';
import { CardsEffects } from './cards.effects';
import { Router } from '@angular/router';

describe('CardsEffects', () => {
  let actions: Observable<Action>;
  let effects: CardsEffects;
  let cardsService: CardsService;
  let router: Router;

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
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(CardsEffects);
    cardsService = TestBed.inject(CardsService);
    router = TestBed.inject(Router);
  });

  describe('createNewDeck$', () => {
    it('should request new deck of cards', () => {
      const { getNewDeck } = cardsService;
      const { navigate } = router;
      actions = hot('-a-|', { a: CardActions.getNewDeck() });

      const expected = hot('-a-|', {
        a: CardActions.getNewDeckSuccess({
          deck: {
            id: '3p40paa87x90',
            remaining: 52,
          },
        }),
      });

      expect(effects.createNewDeck$).toBeObservable(expected);
      expect(navigate).toBeCalledWith(['game']);
      expect(getNewDeck).toBeCalled();
    });
  });
});
