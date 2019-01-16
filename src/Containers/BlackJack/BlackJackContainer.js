import React, { Component } from 'react';
import GameContainer from '../Game/GameContainer';
import StartContainer from '../Start/StartContainer';

class BlackJackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const { gameOver, wallet, betAmount } = this.state;
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
          <GameContainer wallet={wallet} />
        )}
      </div>
    );
  }
}

export default BlackJackContainer;
