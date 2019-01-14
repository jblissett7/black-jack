import React from 'react';
import { shallow } from 'enzyme';
import BlackJack from './BlackJack';
import Dealer from '../Dealer/Dealer';
import Player from '../Player/Player';

describe('BlackJack', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<BlackJack />)));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render a Dealer Component', () => {
    expect(wrapper.containsMatchingElement(<Dealer />)).toEqual(true);
  });

  it('Should render the Player Component', () => {
    expect(wrapper.containsMatchingElement(<Player />)).toEqual(true);
  });
});
