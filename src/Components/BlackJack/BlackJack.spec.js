/*import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import BlackJack from './BlackJack';
import Dealer from '../Dealer/Dealer';
import Player from '../Player/Player';

describe('BlackJack', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJack />);
  });

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
    expect(
      wrapper.containsMatchingElement(
        <Player
          cards={wrapper.instance().state.playerCards}
          count={wrapper.instance().state.playerCount}
        />
      )
    ).toEqual(true);
  });

  it('Should render two buttons', () => {
    expect(wrapper.find('WithStyles(Button)').length).toEqual(2);
  });

  it('Should deal two cards to the player and the dealer', () => {
    expect(wrapper.state('dealerCards').length).toEqual(2);
    expect(wrapper.state('playerCards').length).toEqual(2);
  });
});

describe('Mounted BlackJack Component', () => {
  let wrapper, mount;
  beforeEach(() => {
    mount = createMount();
    wrapper = mount(<BlackJack />);
  });

  afterEach(() => mount.cleanUp());

  it('Calls handleHitButtonClick when hit button is pressed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleHitButtonClick');
    wrapper.instance().forceUpdate();
    //console.log(wrapper.debug());
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Calls handleStandButtonClick when Stand button is pressed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleStandButtonClick');
    wrapper.instance().forceUpdate();
    //console.log(wrapper.debug());
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('getCount', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJack />);
  });

  it('Should add up count with number cards', () => {
    const cards = [
      { name: '2 of Hearts', value: 2 },
      { name: '9 of Clubs', value: 9 },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(11);
  });

  it('Should calculate count with face cards', () => {
    const cards = [
      { name: 'King of Hearts', value: 10 },
      { name: '9 of Clubs', value: 9 },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(19);
  });

  it('Should calculate count with ace as first card', () => {
    const cards = [
      { name: 'Ace of Hearts', value: 'Ace' },
      { name: '9 of Clubs', value: 9 },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(20);
  });

  it('Should calculate count with ace as last card', () => {
    const cards = [
      { name: 'King of Hearts', value: 10 },
      { name: 'Ace of Clubs', value: 'Ace' },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(21);
  });

  it('Should calculate count with two aces', () => {
    const cards = [
      { name: 'Ace of Hearts', value: 'Ace' },
      { name: 'Ace of Clubs', value: 'Ace' },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(12);
  });

  it('Should calculate count with one ace and two other cards', () => {
    const cards = [
      { name: 'Ace of Hearts', value: 'Ace' },
      { name: '5 of Clubs', value: 5 },
      { name: '3 of Clubs', value: 3 },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(19);
  });
});

describe('HandleHitButtonClick', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJack />);
  });

  it('Should add a card to playerCards', () => {
    wrapper.instance().handleHitButtonClick();
    expect(wrapper.state('playerCards').length).toEqual(3);
  });

  it('Should decrease deck size by one', () => {
    wrapper.instance().handleHitButtonClick();
    expect(wrapper.state('deck').deck.length).toEqual(47);
  });
});

describe('HandleStandButtonClick', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJack />);
  });

  it('Should not add a card to dealerCards if dealerCount is 17 or higher', () => {
    wrapper.setState({ dealerCount: 17 });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('dealerCards').length).toEqual(2);
  });

  it('Should add a card to dealerCards', () => {
    wrapper.setState({ dealerCount: 16 });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('dealerCards').length).toBeGreaterThan(2);
  });

  it('Should decrease deck size by one', () => {
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('deck').deck.length).toBeLessThan(48);
  });
});
*/
