import { Card, CardsFacade, CardValue } from '@card-game/cards';
import { GameContainerComponent, GameModule } from '@card-game/game';

import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { GameFacade } from '../+state/game/game.facade';

describe('GameContainerComponent', () => {
  let shallow: Shallow<GameContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(GameContainerComponent, GameModule).provideMock([
      {
        provide: GameFacade,
        useValue: {
          score$: of(0),
          drawTurn$: of(true),
          guessTurn$: of(false),
        },
      },
    ]);
  });

  it('should match the snapshot', async () => {
    const { fixture } = await shallow
      .provideMock([
        {
          provide: CardsFacade,
          useValue: {
            remaining$: of(1),
            playedCards$: of([]),
          },
        },
      ])
      .render();

    expect(fixture).toMatchSnapshot();
  });

  it('should match the snapshot with existing played cards', async () => {
    const { fixture } = await shallow
      .provideMock([
        {
          provide: CardsFacade,
          useValue: {
            remaining$: of(1),
            playedCards$: of([
              {
                image: '',
                value: CardValue.ACE,
                suit: '',
                code: 'H2',
              } as Card,
            ]),
          },
        },
      ])
      .render();

    expect(fixture).toMatchSnapshot();
  });
});
