import { TestBed } from '@angular/core/testing';
import * as CardActions from '@card-game/cards';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import * as GameActions from './game.actions';
import { GameEffects } from './game.effects';

describe('GameEffects', () => {
  let actions: Observable<Action>;
  let effects: GameEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GameEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GameEffects);
  });

  describe('startNewGame$', () => {
    it('should request new deck of cards', () => {
      actions = hot('-a-|', { a: GameActions.startNewGame() });

      const expected = hot('-a-|', { a: CardActions.getNewDeck() });

      expect(effects.startNewGame$).toBeObservable(expected);
    });
  });
});
