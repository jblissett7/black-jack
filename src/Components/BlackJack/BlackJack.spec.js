import React from 'react';
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
