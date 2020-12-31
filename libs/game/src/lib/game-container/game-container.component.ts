import { Component, OnInit } from '@angular/core';
import { CardsFacade } from '@card-game/cards';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GameFacade } from '../+state/game/game.facade';

@Component({
  selector: 'card-game-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent {
  remaining$: Observable<number> = this.cardsFacade.remaining$;
  playedCards$: Observable<string> = this.cardsFacade.playedCards$.pipe(
    map((cards) => cards.map((card) => card.code).join(','))
  );
  score$: Observable<number> = this.gameFacade.score$;
  constructor(
    private readonly cardsFacade: CardsFacade,
    private readonly gameFacade: GameFacade
  ) {}
}
