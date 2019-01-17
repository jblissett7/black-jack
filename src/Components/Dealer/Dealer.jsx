import React, { Component } from 'react';
import MyCard from '../MyCard/MyCard';

class Dealer extends Component {
  render() {
    const { cards, count } = this.props;
    return (
      <div>
        {cards.map((card, index) => (
          <MyCard name={card.card.name} key={index} facedown={card.facedown} />
        ))}
        <h3>{count}</h3>
      </div>
    );
  }
}

export default Dealer;
