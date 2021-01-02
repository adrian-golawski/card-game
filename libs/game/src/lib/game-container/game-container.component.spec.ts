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
        provide: CardsFacade,
        useValue: {
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
      {
        provide: GameFacade,
        useValue: {
          // tslint:disable-next-line:no-magic-numbers
          roundsLeft$: of(30),
          score$: of(0),
        },
      },
    ]);
  });

  it('should match the snapshot with existing played cards', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
