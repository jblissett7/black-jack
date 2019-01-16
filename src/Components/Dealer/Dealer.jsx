import React, { Component } from 'react';
import Card from '../Card/Card';

class Dealer extends Component {
  render() {
    const { cards, count } = this.props;
    return (
      <div>
        {cards.map((card, index) => (
          <Card name={card.card.name} key={index} facedown={card.facedown} />
        ))}
        <h3>{count}</h3>
      </div>
    );
  }
}

export default Dealer;
