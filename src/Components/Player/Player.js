import React, { Component } from 'react';
import MyCard from '../MyCard/MyCard';

class Player extends Component {
  render() {
    const { cards, count } = this.props;
    return (
      <div>
        {cards.map((card, index) => (
          <MyCard name={card.card.name} key={index} />
        ))}
        <h3>{count}</h3>
      </div>
    );
  }
}

export default Player;
