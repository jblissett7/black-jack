import React, { Component } from 'react';
import MyCard from '../MyCard/MyCard';
import Typography from '@material-ui/core/Typography';

class Hand extends Component {
  render() {
    const { cards, count, name } = this.props;
    return (
      <div>
        <Typography>{name}</Typography>
        {cards.map((card, index) => (
          <MyCard name={card.card.name} key={index} facedown={card.facedown} />
        ))}
        <Typography>{count}</Typography>
      </div>
    );
  }
}

export default Hand;
