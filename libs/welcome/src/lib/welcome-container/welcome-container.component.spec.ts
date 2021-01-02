import { GameFacade } from '@card-game/game';
import { WelcomeContainerComponent, WelcomeModule } from '@card-game/welcome';

import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

describe('WelcomeContainerComponent', () => {
  let shallow: Shallow<WelcomeContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(WelcomeContainerComponent, WelcomeModule);
  });

  it('should match the snapshot with no game in progress', async () => {
    const { fixture } = await shallow
      .provideMock([
        {
          provide: GameFacade,
          useValue: {
            gameInProgress$: of(false),
            gameLoading$: of(false),
          },
        },
      ])
      .render();

    expect(fixture).toMatchSnapshot();
  });

  it('should match the snapshot with game in progress', async () => {
    const { fixture } = await shallow
      .provideMock([
        {
          provide: GameFacade,
          useValue: {
            gameInProgress$: of(true),
            gameLoading$: of(false),
          },
        },
      ])
      .render();

    expect(fixture).toMatchSnapshot();
  });

  it('should match the snapshot when game is loading', async () => {
    const { fixture } = await shallow
      .provideMock([
        {
          provide: GameFacade,
          useValue: {
            gameInProgress$: of(false),
            gameLoading$: of(true),
          },
        },
      ])
      .render();

    expect(fixture).toMatchSnapshot();
  });
});
