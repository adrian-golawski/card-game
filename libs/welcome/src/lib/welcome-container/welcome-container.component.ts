import { Component, OnInit } from '@angular/core';
import { CardsFacade } from '@card-game/cards';
import { GameFacade } from '@card-game/game';

import { Observable } from 'rxjs';

@Component({
  selector: 'card-game-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss'],
})
export class WelcomeContainerComponent {
  existingDeck$: Observable<boolean> = this.cardsFacade.deckLoaded$;
  constructor(
    private readonly cardsFacade: CardsFacade,
    private readonly gameFacade: GameFacade
  ) {}

  startGame(): void {
    this.gameFacade.startNewGame();
  }
}
