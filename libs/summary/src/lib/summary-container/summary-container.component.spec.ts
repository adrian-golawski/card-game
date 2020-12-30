import { SummaryContainerComponent, SummaryModule } from '@card-game/summary';

import { Shallow } from 'shallow-render';

describe('SummaryContainerComponent', () => {
  let shallow: Shallow<SummaryContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(SummaryContainerComponent, SummaryModule);
  });

  it('should match the snapshot', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
