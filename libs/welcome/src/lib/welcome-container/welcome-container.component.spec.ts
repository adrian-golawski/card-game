import { CardsFacade } from '@card-game/cards';
import { GameFacade } from '@card-game/game';
import { WelcomeContainerComponent, WelcomeModule } from '@card-game/welcome';

import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

describe('WelcomeContainerComponent', () => {
  let shallow: Shallow<WelcomeContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(WelcomeContainerComponent, WelcomeModule).provideMock(
      [
        {
          provide: GameFacade,
          useValue: {
            gameInProgress$: of(false),
          },
        },
      ]
    );
  });

  it('should match the snapshot when deck is not loaded', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });

  it('should match the snapshot when deck is loaded', async () => {
    const { fixture } = await shallow
      .provideMock([
        {
          provide: CardsFacade,
          useValue: {
            deckLoaded: of(true),
          },
        },
      ])
      .render();

    expect(fixture).toMatchSnapshot();
  });
});
