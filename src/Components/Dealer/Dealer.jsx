import React, { Component } from 'react';
import Card from '../Card/Card';

class Dealer extends Component {
  render() {
    const { cards, count } = this.props;
    return (
      <div>
        {cards.map((card, index) => (
          <Card name={card.name} key={index} value={card.value} />
        ))}
        <h3>{count}</h3>
      </div>
    );
  }
}

export default Dealer;
