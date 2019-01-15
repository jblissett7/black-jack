import React, { Component } from 'react';
import Card from '../Card/Card';

class Dealer extends Component {
  count = () => {
    let count = 0;
    this.props.cards.forEach(card => {
      count += card.value;
    });
    return count;
  };
  render() {
    const { cards } = this.props;
    return (
      <div>
        {cards.map(card => (
          <Card name={card.name} key={card.name} value={card.value} />
        ))}
        <h3>{this.count()}</h3>
      </div>
    );
  }
}

export default Dealer;