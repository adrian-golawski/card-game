import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';

import { Observable, of } from 'rxjs';

import { CardsEffects } from './cards.effects';

describe('CardsEffects', () => {
  const actions: Observable<Action> = of();
  let effects: CardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CardsEffects);
  });

  it('is defined', () => {
    expect(effects).toBeDefined();
  });
});
