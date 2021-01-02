import { GameFacade } from '@card-game/game';
import { SummaryContainerComponent, SummaryModule } from '@card-game/summary';

import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

describe('SummaryContainerComponent', () => {
  let shallow: Shallow<SummaryContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(SummaryContainerComponent, SummaryModule).provideMock(
      [
        {
          provide: GameFacade,
          useValue: {
            score$: of(1),
            startNewGame: jest.fn(),
          },
        },
      ]
    );
  });

  it('should match the snapshot', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
