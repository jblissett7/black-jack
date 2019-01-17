import React, { Component } from 'react';
import GameContainer from '../Game/GameContainer';
import StartContainer from '../Start/StartContainer';
import SnackBar from '@material-ui/core/Snackbar';
import Deck from '../../Utilities/Deck';

class BlackJackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: new Deck().shuffle(),
      wallet: 1000,
      betAmount: null,
      gameOver: true,
      deal: false,
      message: '',
      open: false,
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
        open: true,
      });
    } else {
      wallet = wallet - betAmount;
      this.setState({
        wallet,
        gameOver: false,
        deal: true,
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
        open: true,
      });
    } else if (winner === 'Dealer') {
      console.log('lost');
      this.setState({
        message: 'You lost',
        gameOver: true,
        open: true,
      });
    } else {
      wallet += betAmount;
      console.log('push');
      this.setState({
        wallet,
        message: 'Push',
        gameOver: true,
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { gameOver, wallet, betAmount, deck, message } = this.state;
    return (
      <div>
        <GameContainer
          deck={deck}
          wallet={wallet}
          onWinner={this.handleGameOver}
          deal={this.state.deal}
        />
        {gameOver && (
          <StartContainer
            wallet={wallet}
            betAmount={betAmount}
            onBetAmountChange={this.handleBetAmountChange}
            onBetClick={this.handleClick}
          />
        )}
        <SnackBar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

export default BlackJackContainer;
