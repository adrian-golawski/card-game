import { GameContainerComponent, GameModule } from '@card-game/game';

import { Shallow } from 'shallow-render';

describe('GameContainerComponent', () => {
  let shallow: Shallow<GameContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(GameContainerComponent, GameModule);
  });

  it('should match the snapshot', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
