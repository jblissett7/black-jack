import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class StartContainer extends Component {
  handleChange = event => {
    this.props.onBetAmountChange(event.target.value);
  };

  handleClick = () => {
    this.props.onBetClick();
  };

  render() {
    const { betAmount, totalGamesPlayed, gamesWon } = this.props;
    return (
      <div>
        <Typography>
          Total number of games played: {totalGamesPlayed}
        </Typography>
        <Typography>Total number of games won: {gamesWon}</Typography>
        <TextField
          id="Bet Amount"
          label="Bet Amount"
          value={betAmount}
          onChange={this.handleChange}
        />
        <Button variant="contained" onClick={this.handleClick}>
          Bet
        </Button>
      </div>
    );
  }
}

export default StartContainer;
