import React, { Component } from 'react';
import Card from '../Card/Card';

class Player extends Component {
  render() {
    const { cards, count } = this.props;
    return (
      <div>
        {cards.map(card => (
          <Card name={card.name} key={card.name} value={card.value} />
        ))}
        <h3>{count}</h3>
      </div>
    );
  }
}

export default Player;
