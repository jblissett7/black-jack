import React, { Component } from 'react';
import GameContainer from '../Game/GameContainer';
import StartContainer from '../Start/StartContainer';
import Deck from '../../Utilities/Deck';

class BlackJackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: new Deck().shuffle(),
      wallet: 1000,
      betAmount: null,
      gameOver: true,
      message: '',
    };
  }

  handleBetAmountChange = betAmount => {
    this.setState({
      betAmount,
    });
  };

  handleClick = () => {
    let { betAmount, wallet } = this.state;
    if (betAmount > wallet) {
      this.setState({
        message: 'You do not have sufficent funds.',
      });
    } else {
      wallet = wallet - betAmount;
      this.setState({
        wallet,
        gameOver: false,
      });
    }
  };

  handleGameOver = winner => {
    let { wallet, betAmount } = this.state;
    if (winner === 'Player') {
      wallet += betAmount * 2;
      console.log('won');
      this.setState({
        wallet,
        message: 'You Won!',
        gameOver: true,
      });
    } else if (winner === 'Dealer') {
      console.log('lost');
      this.setState({
        message: 'You lost',
        gameOver: true,
      });
    } else {
      wallet += betAmount;
      console.log('push');
      this.setState({
        wallet,
        message: 'Push',
        gameOver: true,
      });
    }
  };

  render() {
    const { gameOver, wallet, betAmount, deck } = this.state;
    return (
      <div>
        {gameOver ? (
          <StartContainer
            wallet={wallet}
            betAmount={betAmount}
            onBetAmountChange={this.handleBetAmountChange}
            onBetClick={this.handleClick}
          />
        ) : (
          <GameContainer
            deck={deck}
            wallet={wallet}
            onWinner={this.handleGameOver}
          />
        )}
      </div>
    );
  }
}

export default BlackJackContainer;
