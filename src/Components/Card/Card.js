import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { name, facedown } = this.props;
    return (
      <div className="card-container">
        {facedown ? <h3> ? </h3> : <h3>{name}</h3>}
      </div>
    );
  }
}

export default Card;
