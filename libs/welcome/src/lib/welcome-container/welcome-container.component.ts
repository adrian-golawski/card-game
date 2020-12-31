import { Component, OnInit } from '@angular/core';
import { CardsFacade } from '@card-game/cards';

import { Observable } from 'rxjs';

@Component({
  selector: 'card-game-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss'],
})
export class WelcomeContainerComponent implements OnInit {
  existingDeck$: Observable<boolean> = this.cardsFacade.deckLoaded$;
  constructor(private readonly cardsFacade: CardsFacade) {}

  ngOnInit(): void {}
}
