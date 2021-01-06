import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardValue } from '@card-game/cards';

import { Shallow } from 'shallow-render';

import { GameModule } from '../game.module';
import { CardDisplayComponent } from './card-display.component';

describe('CardDisplayComponent', () => {
  let shallow: Shallow<CardDisplayComponent>;

  beforeEach(() => {
    shallow = new Shallow(CardDisplayComponent, GameModule);
  });

  it('should match the snapshot reversed', async () => {
    const { fixture } = await shallow.render({
      bind: { reversed: true },
    });

    expect(fixture).toMatchSnapshot();
  });

  it('should match the snapshot with no card given', async () => {
    const { fixture } = await shallow.render({
      bind: { reversed: false },
    });

    expect(fixture).toMatchSnapshot();
  });

  it('should match the snapshot with card given', async () => {
    const { fixture } = await shallow.render({
      bind: {
        reversed: false,
        card: {
          image: 'https://deckofcardsapi.com/static/img/KH.png',
          value: CardValue.KING,
          suit: 'HEARTS',
          code: 'KH',
        },
      },
    });

    expect(fixture).toMatchSnapshot();
  });
});
