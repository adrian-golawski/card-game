import { Component, OnInit } from '@angular/core';
import { Card, CardsFacade } from '@card-game/cards';

import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'card-game-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  cardPlayed$: Observable<Card> = of(null);
  remaining$: Observable<number> = this.cardsFacade.remaining$;
  playedCards$: Observable<string> = this.cardsFacade.playedCards$.pipe(
    map((cards) => cards.map((card) => card.code).join(','))
  );

  constructor(private readonly cardsFacade: CardsFacade) {}

  ngOnInit(): void {}
}
