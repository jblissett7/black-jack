import React, { Component } from 'react';
import Hand from '../../Components/Hand/Hand';
import StartContainer from '../Start/StartContainer';
import SnackBar from '@material-ui/core/Snackbar';
import Deck from './../../Utilities/Deck';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: new Deck().shuffle(),
      deal: false,
      wallet: 1000,
      betAmount: null,
      blackJacks: 0,
      gameOver: true,
      message: '',
      open: false,
      dealerCards: [{ card: '', facedown: false }],
      dealerCount: 0,
      playerCards: [{ card: '', facedown: false }],
      playerCount: 0,
      totalGamesPlayed: 0,
      gamesWon: 0,
    };
  }

  handleBetAmountChange = betAmount => {
    this.setState({
      betAmount,
    });
  };

  handleBetClick = () => {
    let { betAmount, wallet } = this.state;
    if (betAmount > wallet) {
      if (wallet === 0) {
        // Restart game.
        this.setState({
          wallet: 1000,
          message: 'You ran out of money. Restarting game.',
          open: true,
        });
      } else {
        this.setState({
          message: 'You do not have sufficent funds.',
          open: true,
        });
      }
      // Check to make sure betAmount is a number
    } else if (isNaN(betAmount) || betAmount === ' ' || betAmount === null) {
      this.setState({
        message: 'Please enter a dollar amount.',
        open: true,
      });
    } else {
      wallet = wallet - betAmount;
      this.setState({
        wallet,
        gameOver: false,
      });
    }
  };

  handleClose = () => {
    // Used to close SnackBar after 3 second timeout
    this.setState({
      open: false,
    });
  };

  handleHitButtonClick = () => {
    let { deck, playerCards, playerCount, totalGamesPlayed } = this.state;
    playerCards.push({ card: deck.dealCard() });
    playerCount = this.getCount(playerCards);
    // Player Busts
    if (playerCount > 21) {
      totalGamesPlayed++;
      this.setState({
        playerCards,
        playerCount,
        message: 'You Busted. Dealer wins.',
        open: true,
        deal: true,
        gameOver: true,
        totalGamesPlayed,
      });
    } else {
      this.setState({
        playerCards,
        playerCount,
      });
    }
  };

  handleStandButtonClick = () => {
    let {
      deck,
      dealerCards,
      dealerCount,
      playerCards,
      playerCount,
      wallet,
      betAmount,
      totalGamesPlayed,
      blackJacks,
      gamesWon,
    } = this.state;
    // Check if player has BlackJack
    if (playerCards.length === 2 && playerCount === 21) {
      wallet += betAmount * 2.5;
      totalGamesPlayed++;
      blackJacks++;
      gamesWon++;
      this.setState({
        wallet,
        message: 'BlackJack!',
        open: true,
        deal: true,
        gameOver: true,
        totalGamesPlayed,
        blackJacks,
        gamesWon,
      });
      return;
    }
    // Flip dealer card and calculate the count
    dealerCards[0].facedown = false;
    dealerCount = this.getCount(dealerCards);
    // continue to draw cards until dealer count is atleast 17
    while (dealerCount < 17) {
      dealerCards.push({ card: deck.dealCard() });
      dealerCount = this.getCount(dealerCards);
    }

    if (dealerCount > 21) {
      wallet += betAmount * 2;
      totalGamesPlayed++;
      gamesWon++;
      this.setState({
        dealerCards,
        dealerCount,
        wallet,
        message: 'Dealer Busts! You win!',
        open: true,
        deal: true,
        gameOver: true,
        totalGamesPlayed,
        gamesWon,
      });
    } else {
      this.getWinner(dealerCards, dealerCount, wallet, betAmount);
    }
  };

  startingDeal = () => {
    let { deck, dealerCount, playerCount } = this.state;
    if (deck.deck.length < 15) {
      deck = new Deck().shuffle();
    }
    let { dealerCards, playerCards } = this.clearCards();
    playerCards[0] = { card: deck.dealCard(), facedown: false };
    dealerCards[0] = { card: deck.dealCard(), facedown: true };
    playerCards[1] = { card: deck.dealCard() };
    dealerCards[1] = { card: deck.dealCard() };
    dealerCount = this.getCount(dealerCards);
    playerCount = this.getCount(playerCards);

    this.setState({
      deck,
      dealerCards,
      playerCards,
      dealerCount,
      playerCount,
      deal: false,
    });
  };

  getCount = cards => {
    // Need to put Aces at the end of the array to make it easier to calculate
    // if the Ace should be valued at 1 or 11
    const sortedCards = [];
    cards.forEach(card => {
      if (card.card.value === 'Ace') {
        sortedCards.push(card);
      } else {
        // unshift puts all other cards in front of any aces
        sortedCards.unshift(card);
      }
    });

    let count = sortedCards.reduce((total, card) => {
      // if card is facedown dont add it to the count
      if (!card.facedown) {
        if (card.card.value === 'Ace') {
          // add ace value that gets you closest to 21 without busting.
          return total + 11 <= 21 ? total + 11 : total + 1;
        } else {
          return total + card.card.value;
        }
      } else {
        return total;
      }
    }, 0);
    return count;
  };

  getWinner = (dealerCards, dealerCount, wallet, betAmount) => {
    let { playerCount, totalGamesPlayed, gamesWon } = this.state;
    if (playerCount > dealerCount) {
      // Add winnings to wallet
      wallet += betAmount * 2;
      totalGamesPlayed++;
      gamesWon++;
      this.setState({
        dealerCards,
        dealerCount,
        wallet,
        message: 'You Won!',
        open: true,
        deal: true,
        gameOver: true,
        totalGamesPlayed,
        gamesWon,
      });
    } else if (dealerCount > playerCount) {
      totalGamesPlayed++;
      this.setState({
        dealerCards,
        dealerCount,
        message: 'You Lost',
        open: true,
        deal: true,
        gameOver: true,
        totalGamesPlayed,
      });
    } else {
      // Add bet amount back to wallet
      wallet = wallet + Number(betAmount);
      totalGamesPlayed++;
      this.setState({
        dealerCards,
        dealerCount,
        wallet,
        message: 'Push',
        open: true,
        deal: true,
        gameOver: true,
        totalGamesPlayed,
      });
    }
  };

  clearCards = () => {
    let { dealerCards, playerCards } = this.state;
    dealerCards = [];
    playerCards = [];
    // Return the cards instead of setting the state so it doesnt trigger a re render
    return { dealerCards, playerCards };
  };

  componentDidMount() {
    this.startingDeal();
  }
  render() {
    const {
      dealerCards,
      playerCards,
      dealerCount,
      playerCount,
      betAmount,
      message,
      wallet,
      deal,
      gameOver,
      totalGamesPlayed,
      blackJacks,
      gamesWon,
    } = this.state;
    return (
      <div>
        <Grid container justify="center" spacing={8}>
          <Grid container item justify="center">
            <Typography variant="h3">BlackJack</Typography>
          </Grid>
          {(!gameOver || deal) && (
            <Grid
              container
              item
              justify="center"
              direction="column"
              spacing={8}
            >
              <Grid item>
                <Hand cards={dealerCards} count={dealerCount} name="Dealer" />
              </Grid>
              <Grid item>
                <Hand cards={playerCards} count={playerCount} name="Player" />
              </Grid>
            </Grid>
          )}
          {!gameOver && (
            <Grid container item justify="center" spacing={8}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleHitButtonClick}
                >
                  Hit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleStandButtonClick}
                >
                  Stand
                </Button>
              </Grid>
            </Grid>
          )}
          {deal && (
            <Grid container item justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={this.startingDeal}
              >
                Deal
              </Button>
            </Grid>
          )}
          <Grid container item justify="center">
            <Typography variant="h4">Wallet: ${wallet}</Typography>
          </Grid>
          {gameOver && !deal && (
            <Grid container item justify="center">
              <StartContainer
                betAmount={betAmount}
                onBetAmountChange={this.handleBetAmountChange}
                onBetClick={this.handleBetClick}
                totalGamesPlayed={totalGamesPlayed}
                blackJacks={blackJacks}
                gamesWon={gamesWon}
              />
            </Grid>
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
        </Grid>
      </div>
    );
  }
}

export default GameContainer;
