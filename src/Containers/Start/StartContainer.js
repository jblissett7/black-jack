import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class StartContainer extends Component {
  handleChange = event => {
    this.props.onBetAmountChange(event.target.value);
  };

  handleClick = () => {
    this.props.onBetClick();
  };

  render() {
    const { wallet, betAmount } = this.props;
    return (
      <div>
        <Typography variant="h3">BlackJack</Typography>
        <Typography variant="h3">${wallet}</Typography>
        <TextField
          id="Bet Amount"
          label="Bet Amount"
          value={betAmount}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleClick}>Bet</Button>
      </div>
    );
  }
}

export default StartContainer;
