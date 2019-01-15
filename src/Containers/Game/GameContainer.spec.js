import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import GameContainer from './GameContainer';

describe('GameContainer', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer />);
  });

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
