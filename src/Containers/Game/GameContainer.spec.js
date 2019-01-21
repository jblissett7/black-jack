import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import GameContainer from './GameContainer';
import StartContainer from './../Start/StartContainer';
import Hand from '../../Components/Hand/Hand';

describe('GameContainer initial state', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer />);
  });

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should not render a Hand Component', () => {
    expect(
      wrapper.containsMatchingElement(
        <Hand cards={wrapper.instance().state.dealerCards} />
      )
    ).toEqual(false);
  });

  it('Should render 0 buttons', () => {
    expect(wrapper.find('WithStyles(Button)').length).toEqual(0);
  });

  it('Should render the StartContainer Component', () => {
    expect(wrapper.containsMatchingElement(<StartContainer />)).toEqual(true);
  });

  it('Should deal two cards to the player and the dealer', () => {
    expect(wrapper.state('dealerCards').length).toEqual(2);
    expect(wrapper.state('playerCards').length).toEqual(2);
  });
});

describe('getCount', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer />);
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
    wrapper = shallow(<GameContainer />);
  });

  it('Should add a card to playerCards', () => {
    wrapper.instance().handleHitButtonClick();
    expect(wrapper.state('playerCards').length).toEqual(3);
  });

  it('Should end game if player busts', () => {
    wrapper.setState({
      playerCards: [
        { card: { name: 'King', value: 10 }, facedown: false },
        { card: { name: 'King', value: 10 }, facedown: false },
      ],
    });
    wrapper.instance().handleHitButtonClick();
    expect(wrapper.state('message')).toBe('You Busted. Dealer wins.');
    expect(wrapper.state('open')).toBe(true);
    expect(wrapper.state('deal')).toBe(true);
    expect(wrapper.state('gameOver')).toBe(true);
  });
});

describe('HandleStandButtonClick', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer />);
  });

  it('Should not add a card to dealerCards if dealerCount is 17 or higher', () => {
    wrapper.setState({
      dealerCards: [
        { card: { name: 'King', value: 10 }, facedown: false },
        { card: { name: '7', value: 7 }, facedown: false },
      ],
    });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('dealerCards').length).toEqual(2);
  });

  it('Should correctly bust the dealer', () => {
    wrapper.setState({
      dealerCards: [
        { card: { name: 'King', value: 10 }, facedown: false },
        { card: { name: 'King', value: 10 }, facedown: false },
        { card: { name: 'King', value: 10 }, facedown: false },
      ],
    });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('message')).toBe('Dealer Busts! You win!');
  });

  it('Should add a card to dealerCards', () => {
    wrapper.setState({
      dealerCards: [
        { card: { name: 'King', value: 10 }, facedown: false },
        { card: { name: '6', value: 6 }, facedown: false },
      ],
    });
    wrapper.instance().handleStandButtonClick();
    expect(wrapper.state('dealerCards').length).toBeGreaterThan(2);
  });
});

describe('getWinner', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<GameContainer />);
  });

  it('Should return player if player wins', () => {
    wrapper.setState({
      playerCount: 20,
    });
    wrapper
      .instance()
      .getWinner(
        [
          { card: { name: 'King', value: 10 }, facedown: false },
          { card: { name: 'King', value: 8 }, facedown: false },
        ],
        18,
        900,
        100
      );
    expect(wrapper.state('message')).toBe('You Won!');
    expect(wrapper.state('wallet')).toBe(1100);
  });

  it('Should return dealer if dealer wins', () => {
    wrapper.setState({
      playerCount: 20,
    });
    wrapper
      .instance()
      .getWinner(
        [
          { card: { name: 'King', value: 10 }, facedown: false },
          { card: { name: 'King', value: 11 }, facedown: false },
        ],
        21,
        900,
        100
      );
    expect(wrapper.state('message')).toBe('You Lost');
  });

  it('Should return push if no one wins', () => {
    wrapper.setState({
      playerCount: 20,
    });
    wrapper
      .instance()
      .getWinner(
        [
          { card: { name: 'King', value: 10 }, facedown: false },
          { card: { name: 'King', value: 10 }, facedown: false },
        ],
        20,
        900,
        100
      );
    expect(wrapper.state('message')).toBe('Push');
    expect(wrapper.state('wallet')).toBe(1000);
  });
});
