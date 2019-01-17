/*import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import BlackJackContainer from './BlackJackContainer';
import StartContainer from '../Start/StartContainer';
import GameContainer from '../Game/GameContainer';

describe('BlackJackContainer with gameOver = true', () => {
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

  it('Should not render a GameContainer Component', () => {
    expect(wrapper.containsMatchingElement(<GameContainer />)).toEqual(false);
  });
});

describe('BlackJackContainer with gameOver = false', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJackContainer />);
  });

  it('Should not render a StartContainer Component', () => {
    wrapper.setState({ gameOver: false });
    expect(wrapper.containsMatchingElement(<StartContainer />)).toEqual(false);
  });

  it('Should render a GameContainer Component', () => {
    wrapper.setState({ gameOver: false });
    expect(wrapper.containsMatchingElement(<GameContainer />)).toEqual(true);
  });
});

describe('handleBetAmountChange', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJackContainer />);
  });

  it('should change the bet amount', () => {
    expect(wrapper.state('betAmount')).toBe(null);
    wrapper.instance().handleBetAmountChange(3);
    expect(wrapper.state('betAmount')).toBe(3);
  });
});

describe('handleClick', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJackContainer />);
  });

  it('Should fail if bet amount is > than wallet and show failure message', () => {
    wrapper.setState({ betAmount: 2000 });
    wrapper.instance().handleClick();
    expect(wrapper.state('message')).toBe('You do not have sufficent funds.');
    expect(wrapper.state('wallet')).toBe(1000);
    expect(wrapper.state('gameOver')).toBe(true);
  });

  it('Should subtract bet amount from wallet and start game', () => {
    wrapper.setState({ betAmount: 500 });
    wrapper.instance().handleClick();
    expect(wrapper.state('wallet')).toBe(500);
    expect(wrapper.state('gameOver')).toBe(false);
  });
});

describe('handleGameOver', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<BlackJackContainer />);
  });

  it('Should add money to wallet and end game if player won', () => {
    wrapper.setState({ betAmount: 30 });
    wrapper.instance().handleGameOver('Player');
    expect(wrapper.state('wallet')).toBe(1060);
    expect(wrapper.state('message')).toBe('You Won!');
    expect(wrapper.state('gameOver')).toBe(true);
  });

  it('Should print message and end game if player lost', () => {
    wrapper.setState({ betAmount: 30 });
    wrapper.instance().handleGameOver('Dealer');
    expect(wrapper.state('wallet')).toBe(1000);
    expect(wrapper.state('message')).toBe('You lost');
    expect(wrapper.state('gameOver')).toBe(true);
  });

  it('Should print message and give money back if push', () => {
    wrapper.setState({ betAmount: 30 });
    wrapper.instance().handleGameOver('Push');
    expect(wrapper.state('wallet')).toBe(1030);
    expect(wrapper.state('message')).toBe('Push');
    expect(wrapper.state('gameOver')).toBe(true);
  });
});
*/
