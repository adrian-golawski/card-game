import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { GameEffects } from './game.effects';
import { GameFacade } from './game.facade';
import { GAME_FEATURE_KEY, reducer, State } from './game.reducer';
interface TestSchema {
  games: State;
}

describe('GameFacade', () => {
  let facade: GameFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GAME_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GameEffects]),
        ],
        providers: [GameFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GameFacade);
    });

    it('should be defined()', () => {
      expect(facade).toBeDefined();
    });
  });
});
