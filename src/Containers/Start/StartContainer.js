import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class StartContainer extends Component {
  handleChange = event => {
    this.props.onBetAmountChange(event.target.value);
  };

  handleClick = () => {
    this.props.onBetClick();
  };

  render() {
    const { betAmount, totalGamesPlayed, gamesWon, blackJacks } = this.props;
    return (
      <div>
        <Grid container justify="center" spacing={8}>
          <Grid container item justify="center">
            <Typography>Games played: {totalGamesPlayed}</Typography>
          </Grid>
          <Grid container item justify="center">
            <Typography>Games won: {gamesWon}</Typography>
          </Grid>
          <Grid container item justify="center">
            <Typography>BlackJacks won: {blackJacks}</Typography>
          </Grid>
          <Grid container item justify="center" alignItems="center" spacing={8}>
            <Grid item>
              <TextField
                id="Bet Amount"
                label="Bet Amount"
                value={betAmount}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClick}
              >
                Bet
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StartContainer;
