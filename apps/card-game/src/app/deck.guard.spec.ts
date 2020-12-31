import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CardsFacade } from '@card-game/cards';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { DeckGuard } from './deck.guard';

describe('DeckGuard', () => {
  it('should activate when deck is loaded', () => {
    TestBed.configureTestingModule({
      providers: [
        DeckGuard,
        {
          provide: CardsFacade,
          useValue: {
            deckLoaded$: of(true),
          },
        },
        {
          provide: Router,
          useValue: {
            createUrlTree: jest.fn(),
          },
        },
      ],
    });
    const result$ = cold('(a|)', { a: true });
    const guard = TestBed.inject(DeckGuard);
    expect(guard.canActivate()).toBeObservable(result$);
  });

  it('should navigate to root when deck is not loaded', () => {
    TestBed.configureTestingModule({
      providers: [
        DeckGuard,
        {
          provide: CardsFacade,
          useValue: {
            deckLoaded$: of(false),
          },
        },
        {
          provide: Router,
          useValue: {
            createUrlTree: jest.fn(() => 'mockUrlTree'),
          },
        },
      ],
    });
    const guard = TestBed.inject(DeckGuard);

    const { createUrlTree } = TestBed.inject(Router);
    const result$ = cold('(a|)', { a: 'mockUrlTree' });

    expect(guard.canActivate()).toBeObservable(result$);

    expect(createUrlTree).toBeCalledWith(['/']);
  });
});
