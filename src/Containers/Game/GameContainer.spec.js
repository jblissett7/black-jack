import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import GameContainer from './GameContainer';
import Dealer from '../../Components/Dealer/Dealer';
import Player from '../../Components/Player/Player';
import Deck from '../../Utilities/Deck';

describe('GameContainer', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer deck={new Deck().shuffle()} />);
  });

  it('Should render a <div />', () => {
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

describe('Mounted GameContainer Component', () => {
  let wrapper, mount;
  beforeEach(() => {
    mount = createMount();
    wrapper = mount(
      <GameContainer deck={new Deck().shuffle()} onWinner={jest.fn()} />
    );
  });

  afterEach(() => mount.cleanUp());

  it('Calls handleHitButtonClick when hit button is pressed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleHitButtonClick');
    wrapper.instance().forceUpdate();
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
    wrapper = shallow(<GameContainer deck={new Deck().shuffle()} />);
  });

  it('Should add up count with number cards', () => {
    const cards = [
      { card: { name: '8 of Clubs', value: 8 }, facedown: false },
      { card: { name: '3 of Clubs', value: 3 }, facedown: false },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(11);
  });

  it('Should calculate count with face cards', () => {
    const cards = [
      { card: { name: 'King of Clubs', value: 10 }, facedown: false },
      { card: { name: '9 of Clubs', value: 9 }, facedown: false },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(19);
  });

  it('Should calculate count with ace as first card', () => {
    const cards = [
      { card: { name: 'Ace of Clubs', value: 'Ace' }, facedown: false },
      { card: { name: '9 of Clubs', value: 9 }, facedown: false },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(20);
  });

  it('Should calculate count with ace as last card', () => {
    const cards = [
      { card: { name: 'Ace of Clubs', value: 'Ace' }, facedown: false },
      { card: { name: 'King of Clubs', value: 10 }, facedown: false },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(21);
  });

  it('Should calculate count with two aces', () => {
    const cards = [
      { card: { name: 'Ace of Clubs', value: 'Ace' }, facedown: false },
      { card: { name: 'Ace of Spades', value: 'Ace' }, facedown: false },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(12);
  });

  it('Should calculate count with one ace and two other cards', () => {
    const cards = [
      { card: { name: 'Ace of Clubs', value: 'Ace' }, facedown: false },
      { card: { name: '3 of Clubs', value: 3 }, facedown: false },
      { card: { name: '5 of Clubs', value: 5 }, facedown: false },
    ];
    expect(wrapper.instance().getCount(cards)).toBe(19);
  });
});

describe('HandleHitButtonClick', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <GameContainer deck={new Deck().shuffle()} onWinner={jest.fn()} />
    );
  });

  it('Should add a card to playerCards', () => {
    wrapper.instance().handleHitButtonClick();
    expect(wrapper.state('playerCards').length).toEqual(3);
  });
});

describe('HandleStandButtonClick', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <GameContainer deck={new Deck().shuffle()} onWinner={jest.fn()} />
    );
  });

  it('Should not add a card to dealerCards if dealerCount is 17 or higher', () => {
    wrapper.setState({ dealerCount: 17 });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('dealerCards').length).toEqual(2);
  });

  it('Should correctly bust the dealer', () => {
    wrapper.setState({ dealerCount: 22 });
    wrapper.instance().handleStandButtonClick();
    //expect(wrapper.props('winner')).toBe('Player');
  });

  it('Should add a card to dealerCards', () => {
    wrapper.setState({ dealerCount: 16 });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('dealerCards').length).toBeGreaterThan(2);
  });
});

describe('getWinner', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer deck={new Deck().shuffle()} />);
  });

  it('Should return player if player wins', () => {
    wrapper.setState({ dealerCount: 18, playerCount: 20 });
    expect(wrapper.instance().getWinner()).toBe('Player');
  });

  it('Should return dealer if dealer wins', () => {
    wrapper.setState({ dealerCount: 20, playerCount: 18 });
    expect(wrapper.instance().getWinner()).toBe('Dealer');
  });

  it('Should return push if no one wins', () => {
    wrapper.setState({ dealerCount: 20, playerCount: 20 });
    expect(wrapper.instance().getWinner()).toBe('Push');
  });
});
