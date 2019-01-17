import React, { Component } from 'react';
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
    const { betAmount } = this.props;
    return (
      <div>
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
