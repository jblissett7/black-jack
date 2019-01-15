import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="card-container">
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

export default Card;
