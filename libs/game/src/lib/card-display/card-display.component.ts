import { Component, Input } from '@angular/core';
import { Card } from '@card-game/cards';

@Component({
  selector: 'card-game-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss'],
})
export class CardDisplayComponent {
  @Input() reversed: boolean;
  @Input() card?: Card;

  constructor() {}
}
