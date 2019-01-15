import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import BlackJackContainer from './BlackJackContainer';
import StartContainer from '../Start/StartContainer';
import GameContainer from '../Game/GameContainer';

describe('BlackJackContainer', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJackContainer />);
  });

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render a StartContainer Component', () => {
    expect(wrapper.containsMatchingElement(<StartContainer />)).toEqual(true);
  });

  it('Should render a GameContainer Component', () => {
    expect(wrapper.containsMatchingElement(<GameContainer />)).toEqual(true);
  });
});
