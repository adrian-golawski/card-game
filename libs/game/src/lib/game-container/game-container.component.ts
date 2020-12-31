import { Component, OnInit } from '@angular/core';
import { Card } from '@card-game/cards';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'card-game-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  cardPlayed$: Observable<Card> = of(null);
  remaining$: Observable<number> = of(1);
  playedCards$: Observable<string> = of('');

  constructor() {}

  ngOnInit(): void {}
}
