import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';

import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  Card,
  CreateDeckResponse,
  DrawCardResponse,
} from '../../interfaces/deck-of-cards-api';
import { CardsService } from '../../services/cards.service';
import * as CardActions from './cards.actions';
import { CardsFacade } from './cards.facade';
import { DeckEntity } from './cards.models';

@Injectable()
export class CardsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cardService: CardsService,
    private readonly cardsFacade: CardsFacade
  ) {}

  public createNewDeck$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.createNewDeck),
      fetch({
        run: (a) =>
          this.cardService.getNewDeck().pipe(
            map((deck) => this.mapDeckResponseToDeckEntity(deck)),
            switchMap((deck) =>
              this.cardService.drawCardFromDeck(deck.id).pipe(
                map(
                  (card): DeckEntity => {
                    return {
                      ...deck,
                      playedCards: [card.cards[0]],
                    };
                  }
                )
              )
            ),
            map((deck) => CardActions.createNewDeckSuccess({ deck }))
          ),
        onError: (a: Action, error: Error) =>
          CardActions.createNewDeckFailure({ error }),
      })
    )
  );

  public drawNewCard$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.drawNewCard),
      withLatestFrom(this.cardsFacade.deckId$),
      fetch({
        run: (_, deckId) =>
          this.cardService.drawCardFromDeck(deckId).pipe(
            map((response) => this.mapDrawCardResponseToCard(response)),
            map((card) => {
              return CardActions.drawNewCardSuccess({ card });
            })
          ),
        onError: (a: Action, error: Error) =>
          CardActions.drawCardFailure({ error }),
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
      playedCards: [],
    };
  }

  private mapDrawCardResponseToCard(draw: DrawCardResponse): Card {
    return { ...draw.cards[0] };
  }
}
