import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { CardsEffects } from './cards.effects';
import { CardsFacade } from './cards.facade';
import { CARDS_FEATURE_KEY, reducer, State } from './cards.reducer';

interface TestSchema {
  cards: State;
}

describe('CardsFacade', () => {
  let facade: CardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CARDS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CardsEffects]),
        ],
        providers: [
          CardsFacade,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(),
            },
          },
          {
            provide: Router,
            useValue: {},
          },
        ],
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
      facade = TestBed.inject(CardsFacade);
    });

    it('should be defined()', () => {
      expect(facade).toBeDefined();
    });
  });
});
