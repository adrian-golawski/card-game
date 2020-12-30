import { WelcomeContainerComponent, WelcomeModule } from '@card-game/welcome';

import { Shallow } from 'shallow-render';

describe('WelcomeContainerComponent', () => {
  let shallow: Shallow<WelcomeContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(WelcomeContainerComponent, WelcomeModule);
  });

  it('should match the snapshot', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
