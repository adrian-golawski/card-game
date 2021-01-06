import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@card-game/cards';

@Component({
  selector: 'card-game-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDisplayComponent {
  @Input() reversed: boolean = true;
  @Input() card?: Card;

  constructor() {}
}
