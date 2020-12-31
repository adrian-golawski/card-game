import { Component, OnInit } from '@angular/core';
import { CardsFacade } from '@card-game/cards';

import { Observable } from 'rxjs';

@Component({
  selector: 'card-game-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss'],
})
export class WelcomeContainerComponent {
  existingDeck$: Observable<boolean> = this.cardsFacade.deckLoaded$;
  constructor(private readonly cardsFacade: CardsFacade) {}

  loadNewDeck(): void {
    this.cardsFacade.loadDeck();
  }
}
