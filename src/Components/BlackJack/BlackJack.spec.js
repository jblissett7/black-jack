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
    expect(
      wrapper.containsMatchingElement(
        <Dealer cards={wrapper.instance().state.dealerCards} />
      )
    ).toEqual(true);
  });

  it('Should render the Player Component', () => {
    expect(wrapper.containsMatchingElement(<Player />)).toEqual(true);
  });

  it('Should deal two cards to the player and the dealer', () => {
    expect(wrapper.state('dealerCards').length).toEqual(2);
    expect(wrapper.state('playerCards').length).toEqual(2);
  });

  it('Should correctly add up card count', () => {
    wrapper.setState({
      dealerCards: [
        { name: '2 of Hearts', value: 2 },
        { name: '9 of Clubs', value: 9 },
      ],
    });
    expect(wrapper.instance().getCount(wrapper.state('dealerCards'))).toBe(11);
  });
});
