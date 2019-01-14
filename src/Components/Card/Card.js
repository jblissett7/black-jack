import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="card-container">
        <h3>Name : {this.props.name}</h3>
        <h3>Value : {this.props.value}</h3>
      </div>
    );
  }
}

export default Card;
