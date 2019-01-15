import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import BlackJackContainer from './BlackJackContainer';

describe('BlackJackContainer', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJackContainer />);
  });

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
