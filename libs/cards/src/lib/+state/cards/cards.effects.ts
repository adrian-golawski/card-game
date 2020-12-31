import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateDeckResponse } from '../../interfaces/deck-of-cards-api';
import { CardsService } from '../../services/cards.service';
import * as CardActions from './cards.actions';
import { DeckEntity } from './cards.models';

@Injectable()
export class CardsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cardService: CardsService
  ) {}

  public createNewDeck$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.getNewDeck),
      fetch({
        run: (a) =>
          this.cardService.getNewDeck().pipe(
            map((deck) => this.mapDeckResponseToDeckEntity(deck)),
            map((deck) => CardActions.getNewDeckSuccess({ deck }))
          ),
        onError: (a: Action, error: Error) =>
          CardActions.getNewDeckFailure({ error }),
      })
    )
  );

  private mapDeckResponseToDeckEntity({
    remaining,
    deck_id,
  }: CreateDeckResponse): DeckEntity {
    return {
      id: deck_id,
      remaining,
    };
  }
}
